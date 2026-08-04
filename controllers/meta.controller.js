// controllers/meta.controller.js
export function getRoot(req, res) {
    res.status(200).json({
      name: "Task API",
      version: "1.0",
      endpoints: ["/tasks"],
    });
  }
  
  export function getHealth(req, res) {
    res.status(200).json({ status: "ok" });
  }