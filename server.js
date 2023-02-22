const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
var cors = require("cors");

const app = express();
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10",
});
app.use(cors());

// Set up multer to handle file uploads
const upload = multer();

// Set the S3 bucket name
const BUCKET_NAME = "assignmentstuff1";

// Set the DynamoDB table name
const TABLE_NAME = "FileMetadata";

// Create the DynamoDB table if it does not exist
dynamodb.createTable(
  {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: "FileName", KeyType: "HASH" },
      { AttributeName: "Description", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "FileName", AttributeType: "S" },
      { AttributeName: "Description", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        "Table created successfully:",
        data.TableDescription.TableName
      );
    }
  }
);

// Fetch a file from S3
app.get("/fetch/:filename", (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: req.params.filename,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    } else {
      res.send(data.Body);
    }
  });
});

// Upload a file to S3 and save the file metadata to DynamoDB
app.post("/upload", upload.single("file"), (req, res) => {
  const fileContent = req.file.buffer;
  const fileName = req.body.fileName + ".jpeg"; // Append .jpeg to the filename
  const description = req.body.description;

  const s3params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // Append .jpeg to the filename
    Body: fileContent,
  };

  s3.upload(s3params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    } else {
      const dynamoParams = {
        TableName: TABLE_NAME,
        Item: {
          FileName: { S: fileName }, // Append .jpeg to the filename
          Description: { S: description },
          S3Location: { S: data.Location },
          UploadDate: { S: new Date().toISOString() },
        },
      };

      dynamodb.putItem(dynamoParams, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
        } else {
          res.send(`File uploaded successfully: ${data.Location}`);
        }
      });
    }
  });
});


// Delete a file from S3 and delete the file metadata from DynamoDB
app.delete("/delete/:filename/:description", (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: req.params.filename,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    } else {
      const dynamoParams = {
        TableName: "FileMetadata",
        Key: {
          FileName: { S: req.params.filename },
          Description: { S: req.params.description },
        },
      };

      dynamodb.deleteItem(dynamoParams, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
        } else {
          res.send(`File deleted successfully: ${params.Key}`);
        }
      });
    }
  });
});

app.get("/list", (req, res) => {
  const s3params = {
    Bucket: BUCKET_NAME,
  };

  s3.listObjects(s3params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    } else {
      const s3files = data.Contents.map((file) => file.Key);

      const dynamoParams = {
        TableName: "FileMetadata",
      };

      dynamodb.scan(dynamoParams, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
        } else {
          const metadata = data.Items.reduce((acc, item) => {
            acc[item.FileName.S] = {
              uploadDate: item.UploadDate.S,
              description: item.Description.S,
            };
            return acc;
          }, {});

          const filesWithMetadata = s3files.map((file) => {
            return {
              fileName: file,
              uploadDate: metadata[file] ? metadata[file].uploadDate : null,
              description: metadata[file] ? metadata[file].description : null,
            };
          });

          res.send(filesWithMetadata);
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});