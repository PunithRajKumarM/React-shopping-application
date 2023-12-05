import React from "react";

export default function ContactPage() {
  return (
    <div className="contact">
      <form className="contact-form">
        <table>
          <tr>
            <td>
              <label htmlFor="name">Name</label>
            </td>
            <td>
              <input id="name" type="text" placeholder="Name" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="mail">Mail</label>
            </td>
            <td>
              <input id="mail" type="email" placeholder="Mail" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="phone">Phone</label>
            </td>
            <td>
              <input id="phone" type="tel" placeholder="Phone" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="message">Message</label>
            </td>
            <td>
              <textarea
                name=""
                id="message"
                cols="40"
                rows="5"
                placeholder="Message"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="button">Send</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
