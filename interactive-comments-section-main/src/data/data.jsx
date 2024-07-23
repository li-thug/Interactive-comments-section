import amyrobsonPng from "../assets/Images/avatars/image-amyrobson.png";
import amyrobsonWebp from "../assets/Images/avatars/image-amyrobson.webp";
import maxblagunPng from "../assets/Images/avatars/image-maxblagun.png";
import maxblagunWebp from "../assets/Images/avatars/image-maxblagun.webp";
import ramsesmironPng from "../assets/Images/avatars/image-ramsesmiron.png";
import ramsesmironWebp from "../assets/Images/avatars/image-ramsesmiron.webp";
import juliusomoPng from "../assets/Images/avatars/image-juliusomo.png";
import juliusomoWebp from "../assets/Images/avatars/image-juliusomo.webp";

export const initialComments = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "2024-04-29 08:08:08",
    score: 12,
    user: {
      image: {
        png: amyrobsonPng,
        webp: amyrobsonWebp,
      },
      username: "amyrobson",
    },
    replies: [],
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2024-05-15 08:08:08",
    score: 5,
    user: {
      image: {
        png: maxblagunPng,
        webp: maxblagunWebp,
      },
      username: "maxblagun",
    },
    replies: [
      {
        id: 3,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "2024-05-22 08:08:08",
        score: 4,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: ramsesmironPng,
            webp: ramsesmironWebp,
          },
          username: "ramsesmiron",
        },
      },
      {
        id: 4,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2024-05-28 08:08:08",
        score: 2,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: juliusomoPng,
            webp: juliusomoWebp,
          },
          username: "juliusomo",
        },
      },
    ],
  },
];

export const initUser = {
  image: {
    png: juliusomoPng,
    webp: juliusomoWebp,
  },
  username: "juliusomo",
};
