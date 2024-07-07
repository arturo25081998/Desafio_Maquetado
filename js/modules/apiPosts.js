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

const getAllComments = async (postKey) => {
  let response = await fetch(`${BASE_URL}/${postKey}/comments/.json`);
  let data = await response.json();
  console.log(data);
  if (data === null) {
    return null;
  } else {
    let keysArray = Object.keys(data);
    let commentsArray = keysArray.map((key) => ({ ...data[key], key }));
    //console.log(commentsArray);
    return commentsArray;
  }
};

const uploadPost = async (postObject) => {
  let response = await fetch(`${BASE_URL}/.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
  });
  let data = await response.json();
  //console.log(data);
  return data;
};

const getPostByKey = async (postKey) => {
  let response = await fetch(`${BASE_URL}/${postKey}/.json`);
  let data = await response.json();
  return data;
};

const uploadComment = async (comment, postKey) => {
  let response = await fetch(`${BASE_URL}/${postKey}/comments/.json`, {
    method: "POST",
    body: JSON.stringify(comment),
  });
  let data = await response.json();
  return data;
};

export { getAllPosts, uploadPost, getPostByKey, uploadComment, getAllComments };
