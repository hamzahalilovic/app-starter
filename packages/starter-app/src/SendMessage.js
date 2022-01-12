import React from "react";

export default ({ username, onCreate }) => {
  const [msg, setMsg] = React.useState("");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: "60px",
      }}
    >
      <input
        name="msg"
        placeholder="your message"
        onChange={(e) => setMsg(e.target.value)}
        defaultValue={msg}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("SEND MESSAGE", msg);
            //onCreate({ body: this.state.body });
            onCreate(msg, username);
          }
        }}
        className="message-input"
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          fontSize: "16px",
          padding: "30px",
          width: "100%",
        }}
      />
    </div>
  );
};
