let blogPost = [];

function addBlogPost(event) {
  event.preventDefault();

  let blogTitle = document.getElementById("input-project-name").value;
  let blogAuthor = "admin";
  let blogStartDate = document.getElementById("input-project-startdate").value;
  let blogEndDate = document.getElementById("input-project-enddate").value;
  let blogContent = document.getElementById("input-description").value;
  let blogNode = document.getElementById("nodejs").checked;
  let blogReact = document.getElementById("reactjs").checked;
  let blogAndroid = document.getElementById("android").checked;
  let blogJs = document.getElementById("javascript").checked;
  let blogImage = document.getElementById("input-project-image").files;

  blogImage = URL.createObjectURL(blogImage[0]);

  let blogDuration = getDuration(blogStartDate, blogEndDate);
  limitPost(blogContent);

  let blogNewPost = {
    title: blogTitle,
    author: blogAuthor,
    duration: blogDuration,
    content: blogContent,
    nodejs: blogNode,
    reactjs: blogReact,
    android: blogAndroid,
    javascript: blogJs,
    cover: blogImage,
  };

  blogPost.push(blogNewPost);

  displayBlog();
}

function displayBlog() {
  document.getElementById("blog-area").innerHTML = ``;
  for (let index = 0; index < blogPost.length; index++) {
    document.getElementById("blog-area").innerHTML += `
        <div class="col-4">
            <div class="card">
                <a href="project-detail.html">
                    <div class="card-image">
                        <img src="${blogPost[index].cover}"
                            alt="blog-1" class="card-image-img">
                    </div>
                    <div class="card-content">
                        <h4 class="card-content-title">${blogPost[index].title}</h4>
                        <p class="card-content-subtitle">Durasi: ${blogPost[index].duration} Bulan</p>
                        <p class="card-content-text">${blogPost[index].content}... Read more</p>
                    </div>
                </a>

                <div class="card-icon-container ">
                    <div class="row">
                        <i class="fa-brands fa-node-js ${blogPost[index].nodejs}"></i>
                        <i class="fa-brands fa-react ${blogPost[index].reactjs}"></i>
                        <i class="fa-brands fa-android ${blogPost[index].android}"></i>
                        <i class="fa-brands fa-js-square ${blogPost[index].javascript}"></i>
                    </div>
                </div>
                <div class="card-button-container margin-tb-16 row">
                    <div class="col-6">
                        <button class="card-button">Edit</button>
                    </div>
                    <div class="col-6">
                        <button class="card-button">Delete</button>
                    </div>
                </div>
            </div>
        </div>`;
  }
}

function getDuration(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let duration = end.getTime() - start.getTime();
  let month = Math.round(duration / (1000 * 3600 * 24 * 30));

  if (month < 1) {
    return "< 1";
  } else {
    return month;
  }
}

function limitPost(postpreview) {
  let maxLength = 150;
  if (postpreview && postpreview.trim()) {
    postpreview = postpreview.substr(0, maxLength);
  } else {
    postpreview = postpreview.substr(
      0,
      Math.min(postpreview.length, postpreview.lastIndexOf(" "))
    );
  }
}