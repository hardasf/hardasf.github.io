const axios = require('axios');
const fs = require('fs');

module.exports = {
  description: "Search corn video",
  role: "user",
  coins: 5,
  cooldown: 30,
  async execute(api, event, args, commands) {
    try {
      if (args.length === 0) {
        api.sendMessage('ano i sesearch ko lugaw?', event.threadID);
        return;
      }

      const info = await api.getUserInfo(event.senderID);
      const senderName = info[event.senderID].name;
      api.sendMessage(`Manyakis ${senderName} is searching for ${args.join(' ')}`, event.threadID);

      const apiUrl = 'https://deku-rest-api-3ijr.onrender.com/prn/search/' + encodeURIComponent(args.join(' '));
      const response = await axios.get(apiUrl);
      const videos = response.data.result;

      if (!videos || videos.length === 0) {
        throw new Error("No corn video found for the provided query.");
      }

      const firstVideo = videos[0].video;

      const cornDownloadResponse = await axios.get(`https://deku-rest-api-3ijr.onrender.com/prn/download?url=${encodeURIComponent(firstVideo)}`);
      const cornDownloadURL = cornDownloadResponse.data.result.contentUrl.Default_Quality;

      if (!cornDownloadURL) {
        throw new Error("Error: Link not found!");
      }

      const cornFilePath = await downloadCornVideo(cornDownloadURL);

      await api.sendMessage({
        body: `Here's the corn video you requested`,
        attachment: fs.createReadStream(cornFilePath)
      }, event.threadID);
    } catch (error) {
      console.error(error);
      if (error.message === "No corn video found for the provided query." || error.message === "Error: Link not found!") {
        api.sendMessage(error.message, event.threadID);
      } else {
        api.sendMessage('Error🙄', event.threadID, event.messageID);
      }
    }
  }
};
/*
async function downloadCornVideo(url) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const cornFilePath = `cache/corn.mp4`;
    const writer = fs.createWriteStream(cornFilePath);

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);

      writer.on('finish', () => resolve(cornFilePath));
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Error downloading corn video: ${error.message}`);
  }
  */
  
async function downloadCornVideo(url) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const date = new Date();
    const cornFilePath = `cache/${date.toLocaleDateString()}_corn.mp4`;
    const writer = fs.createWriteStream(cornFilePath);

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);

      writer.on('finish', () => resolve(cornFilePath));
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Error downloading corn video: ${error.message}`);
  }
        }
                                       
