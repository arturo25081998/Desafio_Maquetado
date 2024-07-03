const BASE_URL = "https://kodemia-23e50-default-rtdb.firebaseio.com/dev/posts";

const getAllPosts = async () => {
  let response = await fetch(`${BASE_URL}/.json`);
  let data = await response.json();
  //console.log(data);
  let keysArray = Object.keys(data);
  let postArray = keysArray.map((key) => ({ ...data[key], key }));
  //console.log(postArray);
  return postArray;
};

const uploadPost = async (postObject) => {
  let response = await fetch(`${BASE_URL}/.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
  });
  let data = await response.json();
  console.log(data);
  return data;
};

export { getAllPosts, uploadPost };
