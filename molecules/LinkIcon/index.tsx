import React from "react"

export default function LinkIcon({ children = "" }) {
  const redirect = () => window.open(children, "_blank")

  return (
    <button onClick={redirect} type="button" className="browser">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18FEDVX9K6usK8pYYGG_9X6somzH-G80M84PsNClXvw9OK50Tfs84KbdgII5mCPH_b0M&usqp=CAU"
        alt="browser_icon"
      />
    </button>
  )
}
