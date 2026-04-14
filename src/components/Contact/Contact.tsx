import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Contact() {
  const [toSend, setToSend] = useState({
    from: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = document.getElementById("btn");

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailValue = toSend.email;

    if (emailValue.match(emailRegex) && toSend.from !== "" && btn) {
      btn.innerHTML = `
        <span class="loader"></span>
      `;

      emailjs
        .send(
          "service_6uaqdew",
          "template_bfmkida",
          toSend,
          "b2s8JToAu9SMW-taX",
        )
        .then(() => {
          setToSend({
            from: "",
            email: "",
            message: "",
          });
          btn.innerHTML = "Send Message";
          toast.success("Message sent successfully!");
        })
        .catch(() => {
          btn.innerHTML = "Send Message";
          toast.error("Failed to send message.");
        });
    } else {
      if (btn) btn.innerHTML = "Send Message";
      toast.error("Please fill in all fields with valid information.");
    }
  };

  return (
    <section className="box2 contact" id="contact">
      <h1 className="h1">Get In Touch</h1>
<p className="p">
  Feel free to reach out through any of the available channels below—whether it's for collaboration, project inquiries, or simply to say hello. I'm always open to meaningful conversations and new opportunities.
</p>
      <div className="formbody">
        <form className="form" onSubmit={onSubmit}>
          <div className="input">
            <span>
              <i className="fa-solid fa-user"></i>Your Name
            </span>
            <input
              type="text"
              name="from"
              placeholder="Your Name"
              value={toSend.from}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <span>
              <i className="fa-solid fa-envelope"></i>Your Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={toSend.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <span>
              <i className="fa-solid fa-comment"></i>Your Message
            </span>
            <textarea
              name="message"
              placeholder="Your Message"
              value={toSend.message}
              onChange={handleChange}
              required
            />
          </div>

          <button id="btn" type="submit" className="submitBtn">
            Send Message
          </button>
        </form>

        <div className="infoCards">
          <div className="infoCard card">
            <a href="tel:+201006770769" className="infoBox" target="_blank">
              <i className="fa fa-phone"></i> +201006770769
            </a>
          </div>

          <div className="infoCard card">
            <a
              href="mailto:floky4444@gmail.com"
              className="infoBox"
              target="_blank"
            >
              <i className="fa fa-envelope"></i> floky4444@gmail.com
            </a>
          </div>

          <div className="infoCard card">
            <a
              href="https://wa.me/+201006770769"
              target="_blank"
              className="infoBox"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>

          <div className="infoCard card">
            <a
              href="https://github.com/yousef767"
              target="_blank"
              className="infoBox"
            >
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>

          <div className="infoCard card">
            <a
              href="https://www.linkedin.com/in/yousef-ahmed-2862a2252/"
              target="_blank"
              className="infoBox"
            >
              <i className="fa-brands fa-linkedin"></i> LinkedIn
            </a>
          </div>

          <div className="infoCard card">
            <a
              href="https://instagram.com/jo_ahmedd"
              target="_blank"
              className="infoBox"
            >
              <i className="fa-brands fa-instagram"></i> Instagram
            </a>
          </div>

          <div className="infoCard card">
            <a
              href="https://www.facebook.com/yousef.ahmed.206014"
              target="_blank"
              className="infoBox"
            >
              <i className="fa-brands fa-facebook"></i> Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
