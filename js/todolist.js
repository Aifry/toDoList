$(function() {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false }); //push追加数组数据
                // 把这个数组local 存储给本地存储
                saveDate(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load(); //把最新最完整的数据加载到页面
                $(this).val(""); //清空输入文本框
            }
        }
    });
    // 3. toDoList 删除操作
    $("ol, ul").on("click", "a", function() {
        // alert(11);
        // 先获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id"); //获取索引号（index是自定义属性，用attr），利用它来删除
        console.log(index);
        // 先删除，再保存，再重新加载到页面
        data.splice(index, 1); //删除操作，要删除的不是li,而是本地存储的操作，li是根据数据个数自动生成的
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 4. toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() { //都是先获取，再修改，再保存，最后加载显示出来（渲染页面）
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据（修改down状态），决定放在ul还是ol里
        var index = $(this).siblings("a").attr("id"); //兄弟a有索引，可以用它的索引
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked"); //down状态和checked属性一致，选定则true
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 读取本地存储的数据（刚进入页面、删除、追加、更新都用到，所以写在一个函数里，调用） 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return []; //本地存储为空，返回空对象
        }
    }
    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data)); //变为字符串
    }
    // 渲染加载数据（把本地存储的最新数据加载，渲染后显示在页面）
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty(); //先清空页面显示，不然再load会重复
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) { //动态生成li，追加到ul、ol，根据down属性决定加到哪一栏
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount); //遍历完后，把统计的个数显示在页面
        $("#donecount").text(doneCount);

    }

})