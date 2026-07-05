import { useState } from "react";
import { sendContactMessage } from "../api.js";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm]     = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      // 1. Send email notification via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8e9ccb33-6e00-45f0-bd07-4984ef30b3f4",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Email service failed");
      }

      // 2. Save to database backup
      try {
        await sendContactMessage(form);
      } catch (dbErr) {
        console.warn("Could not save to DB, but email was sent.", dbErr);
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20 relative z-10">
      {/* Centered header */}
      <div className="text-center">
        <p className="eyebrow">05 / contact</p>
        <h2 className="section-title mt-2 text-3xl text-paper">Start a Conversation</h2>
        <p className="mt-2 text-fog text-sm">
          Have an opportunity, a project, or just want to say hi?
        </p>
      </div>

      {/* Centered form */}
      <form onSubmit={handleSubmit} className="mt-10 mx-auto max-w-lg space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-mono text-fog uppercase tracking-wider">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-mono text-fog uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-mono text-fog uppercase tracking-wider">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="What's on your mind?"
            className="input-field resize-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
          </button>
        </div>

        {status === "success" && (
          <p className="font-mono text-sm text-ember animate-fade-in">
            Message sent. I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-sm text-rose/80">
            Could not send message: {errorMsg}
          </p>
        )}
      </form>
    </section>
  );
}
