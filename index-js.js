var post = DB.table('post'); //文章的資料表
var comment = DB.table('comment'); //留言的資料表
var userName = USER_NAME;
var _postId;

post.read({}, updatePostList);


$('.js-show-form-page').click(showFormPage); //「發文」按鈕點擊時，切換表單頁面
$('.js-show-post-list').click(showHomePage); //「取消」按鈕點擊時，切換文章列表頁面
$('#home-page').on('click', '.post-item', showPostPage); //「取消」按鈕點擊時，切換文章列表頁面
$(".js-filter").click(filter);

// 切換「文章檢視」頁面
function showPostPage () {
    $('#home-page').hide();
    $('#post-page').show();
    $('#form-page').hide();
    
    var postId = $(this).data("id");
    // alert(postId);
    post.read({id: postId}, updatePost);
    comment.read({postId: _postId}, updateComment);
}

// 切換「文章新增」頁面
function showFormPage () {
    $('#home-page').hide();
    $('#post-page').hide();
    $('#form-page').show();
}

// 切換「文章列表」頁面
function showHomePage () {
    $('#home-page').show();
    $('#post-page').hide();
    $('#form-page').hide();
}

$('.js-create-post').click(createPost); //「送出」按鈕點擊
$('.js-filter').click(filter); //「分類」按鈕點擊
$('.js-create-comment').click(createComment); // 新增留言


// 新增文章到資料表
function createPost () {
    var typeVal = $('#form-type').val();
    var titleVal = $('#form-title').val();
    var contentVal = $('#form-content').val();
    if (typeVal !== "" && titleVal !== "" && contentVal.length >= 2){
        $('#form-type').val('');
        $('#form-title').val('');
        $('#form-content').val('');
        
        post.create({
            type: typeVal,
            title: titleVal,
            content: contentVal,
            author: userName,
            date: new Date,
            postId: _postId
        }, console.log);

        showHomePage();
        post.read({}, updatePostList);
    } else {
        alert("請確認文章類型、標題及內容要有20個字");
    }
}


// 更新首頁的文章列表
function updatePostList (data) {
    if (data.length > 0){
        $("#bottom-text").text("你到了底部");
    } else {
        $("#bottom-text").text("無搜尋結果");
    }
    $("#post-list").empty();
    data.forEach(function(d){
        var post_html = `<div class="post-item card" data-id="${d.id}">
                <h3><span class="tag bg-orange">${d.type}</span>${d.title}</h3>
                <p>${d.content}.</p>
                <span class="gray">${d.date}</span>
            </div>`;
        $("#post-list").append(post_html);
    });
}

// 顯示特定類型的文章
function filter () {
    var typeVal = $(this).data('type');
    if (typeVal == "全部"){
        post.read({}, updatePostList);
    } else {
        post.read({type: typeVal}, updatePostList);
    }
}

// 顯示指定文章
function updatePost (data) {
    $("#post-type").text(data[0].type);
    $("#post-title").text(data[0].title);
    $("#post-date").text(data[0].date);
    $("#post-content").text(data[0].content);
    
}

// 新增文章
function createComment () {
    var contentVal = $('#comment-input').val();
    $('#comment-input').val('');
    comment.create({
        author: userName,
        content: contentVal,
        data: new Date,
        postId: _postId
    }, console.log);
    comment.read({postId: _postId}, updateComment);
}

// 更新留言
function updateComment (data) {
    $("#comment-length").text(data.length + "則留言" );
    $("#comment-list").empty();
    data.forEach(function(d){
        var comment_html = `<div class="comment-item card">
                <strong>${d.author}</strong>
                <span>${d.content}</span>
            </div>`;
            $("#comment-list").append(comment_html);
    });
}

// 根據文章類型對應顏色的標籤
function typeToClass (type) {

}




