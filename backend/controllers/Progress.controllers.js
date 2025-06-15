import Progress from "../models/Progress.model.js";

export const CreateProgress = async (req, res) => {
  try {
    const { title, slug, author, content, investedTime } = await req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: "title, slug and content are assential",
      });
    }

    const newProgress = await Progress.create({
      title,
      slug,
      author,
      content,
      investedTime,
    });

    if (!newProgress) {
      return res.status(500).json({
        success: false,
        message: ["Progress not created: "],
      });
    }

    res.status(201).json({
      success: true,
      message: "Progress Created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Creation failed: ", error.message],
    });
  }
};

export const GetProgresses = async (req, res) => {
  try {
    await Progress.find({}).then((progresses) => res.json(progresses));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: [
        "Internal server error while fetching progresses :",
        error.message,
      ],
    });
  }
};

export const GetProgressById = async (req, res) => {
  try {
    const id = req.params.id;
    await Progress.findById({ _id: id }).then((progress) => res.json(progress));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: [
        "Internal server error while fetching progress:",
        error.message,
      ],
    });
  }
};
