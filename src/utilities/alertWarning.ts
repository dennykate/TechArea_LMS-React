import toast from "react-hot-toast";

const alertWaring = (text: string, emoji: string = "⚠️") => {
  return toast(text, {
    icon: emoji,
  });
};

export default alertWaring;
