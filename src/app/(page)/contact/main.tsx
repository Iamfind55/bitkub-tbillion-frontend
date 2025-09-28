"use client";
export default function Main() {
  let name;
  let accountId;
  if (typeof localStorage !== "undefined") {
    name = localStorage.getItem("name") ?? "";
    accountId = localStorage.getItem("accountId") ?? "";
  }

  return (
    <div>
      {name && <p>ชื่อ: {name}</p>}
      {accountId && accountId !== "null" && <p>ไอดี: {accountId}</p>}
    </div>
  );
}
