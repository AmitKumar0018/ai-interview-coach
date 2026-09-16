import fs from "fs";
import { PDFParse } from "pdf-parse";
import { CanvasFactory } from "pdf-parse/worker";

// upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);

    const parser = new PDFParse({
      data: fileBuffer,
      CanvasFactory,
    });

    const pdfData = await parser.getText();

    await parser.destroy();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      fileName: req.file.filename,
      resumeText: pdfData.text,
    });
  } catch (error) {
    console.log(`error from controller upload resume ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { uploadResume };
