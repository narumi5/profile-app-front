"use client";
export default function PracticeUser() {
  const user = {
    name: "takuya",
    age: 27,
    hobby: ["サッカー", "野球"],
    company: { name: "カイセイ薬局", menubars: 100 },
  };
  const fruts = ["banana", "apple", "orage", ["いちご", "ぶどう"]];
  const users = [
    {
      name: "narumi",
      age: 27,
      hobby: ["サッカー", "野球"],
      company: { name: "カイセイ薬局", menubars: 100 },
    },
    {
      name: "narumi",
      age: 24,
      hobby: ["音楽", "野球"],
      company: { name: "成美薬局", menubars: 300 },
    },
  ];
  return (
    <>
      <div>{user.company.name}</div>
      <div>{fruts[3][1]}</div>
      <div>{users[1].company.name}</div>
      <div>
        {users.map((user, index) => {
          console.log(index);
          return (
            <div key={index}>
              <div>名前:{user.name}</div>
              <div>年齢:{user.age}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
