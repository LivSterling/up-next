const cloudinary = require("../../middleware/cloudinary");
const {writeFile} = require( "fs/promises");
const Replicate = require( "replicate");
const replicate = new Replicate({auth: process.env.REPLICATE_API_TOKEN,});

module.exports = {
    generateMockup: async (req, res) => {
        try {
          const { idea, description } = req.body;


          if (!idea || !description) {
        return res.status(400).json({ error: 'Missing prompt content.' });
      }


            const input = {
                prompt: `Take this described garment: ( ${description}, and turn it into a stylized fashion mockup of an upcycled redesigned garment using this design: ${idea}. Use Studio lighting, editorial photo style, minimalist background.`,
               aspect_ratio: "1:1",
  output_format: "webp",
  output_quality: 80,
  safety_tolerance: 2,
  prompt_upsampling: true
            }
            console.log("HERE!!!!!!!!-->", input)
            
            const output = await replicate.run("black-forest-labs/flux-1.1-pro", { input });
            console.log(typeof output)
            console.log(output)
            console.log(output.url())

            const imageUrl = typeof output === 'string' ? output : output.toString();
            const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "mockups",
        format: "jpg",
      });
             res.json({
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });

      console.log('Received idea:', idea);
console.log('Received description:', description);
            //=> output_0.webp written to disk
        } catch (err) {
          console.error('Mockup generation failed:', err);
            res.status(500).json({ error: "Something went wrong", details: err.message });
            
          }
        }
    }
    
  