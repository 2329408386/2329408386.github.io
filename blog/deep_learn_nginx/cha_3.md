# 第3章 开发一个简单的HTTP模块

> 1. Nginx中调用HTTP模块时序图：![3_1_nginx中调用http模块时序图](/Users/lichengpeng/Documents/learn/2329408386.github.io/static/understand_nginx/3_1_nginx中调用http模块时序图.png)
>
> 2. Nginx定义、封装的一些基本数据结构：
>
>    > a. ngx_int_t  -> int
>    >
>    > b. ngx_uint_t ->unsigned int
>    >
>    > c. ngx_str_t -> `typedef struct { size_t len; u_char *data;}ngx_str_t;`
>    >
>    > d. ngx_list_t 就是个链表，ngx_list_part_t 是链表每个元素，用于存储用户想要存储的东西
>    >
>    > e. ngx_table_elt_t 相当于一个hashmap
>    >
>    > f. ngx_buf_t -> nginx处理大数据的关键数据结构
>    >
>    > g. ngx_chain_t -> 这是与ngx_buf_t配合使用的链表数据结构，相当于ngx_buf_t是ngx_chain_t的一个节点
>
> 3. 如何将自己的HTTP模块编译进Nginx：
>
>    > a. 在nginx源文件的src目录下创建一个文件夹，比如my_http
>    >
>    > b. 在my_http文件夹中创建一个自己的模块，比如叫做ngx_http_mytest_module.c
>    >
>    > c. 在文件夹中创建一个config文件，命名必须是config，而且config是一个可执行的sh文件，在config文件中加入配置信息:
>    >
>    > ```sh
>    > ngx_addon_name=ngx_http_mytest_module
>    > HTTP_MODULES="$HTTP_MODULES ngx_http_mytest_module"
>    > NGX_ADDON_SRCS="$NGX_ADDON_SRCS $ngx_addon_dir/ngx_http_mytest_module.c"
>    > 
>    > ```
>    >
>    > d. 在nginx目录下执行`./configure --prefix=/home/work/lichengpeng/my_nginx/nginx --sbin-path=sbin/nginx --conf-path=conf/nginx.conf --error-log-path=logs/error.log --pid-path=logs/nginx.pid --lock-path=logs/nginx.lock --builddir=objs --with-debug --add-module=src/my_http`命令，这样我们的模块就被加入到了nginx_module.c文件中，可以手动更改ngx_modules[]数组的顺序来决定你的模块在发送冲突时怎么执行
>    >
>    > e. 执行命令`make`
>    >
>    > f. 执行命令`make install`
>
> 4. HTTP模板的数据结构：
>
>    > a. 定义一个HTTP模块：ngx_module_t，务必把type字段设置为NGX_HTTP_MODULE，这个模块中，最重要是ctx和commands这2个成员，其中ctx指针必须指向ngx_http_module_t接口
>    >
>    > b. commands数组用于定义模块的配置文件参数，每一个数组元素都是ngx_command_t类型，数组的结尾用ngx_null_command表示
>    >
>    > c. 定义一个ngx_command_t数组：
>    >
>    > ```c
>    > static ngx_command_t ngx_http_mytest_commands[] = { {
>    >             ngx_string("mytest"),
>    >             NGX_HTTP_MAIN_CONF|NGX_HTTP_SRV_CONF|NGX_HTTP_LOC_CONF|NGX_HTTP_LMT_CONF|NGX_CONF_NOARGS,
>    >             ngx_http_mytest,
>    >             NGX_HTTP_LOC_CONF_OFFSET,
>    >             0,
>    >             NULL
>    >         },
>    >         ngx_null_command
>    > };
>    > ```

> 5. 定义自己的HTTP模块：
>
> ```c
> ngx_command_t[] -> ngx_string("mytest") -> ngx_http_mytest -> ngx_http_mytest_handler
> ```
>
> 6. 在配置文件中，加上配置：
>
> ```conf
> location /test {
> 		mytest;
> }
> ```
>
> 7. 有没有发现，有时候，自己已经更改了模块了，但是重启nginx时，依然在发现模块不生效，很有可能是缓存在作怪，请尝试./sbin/nginx -s stop，再 ./sbin/nginx，这样会好很多
>
> 8. Nginx将磁盘文件作为包体发送，可以先把文件读到内存中再向用户发送数据，但这样做有2个缺点：
>
>    > a. 为了不阻塞Nginx，每次只能读取并发送磁盘中的少量数据，需要反复持续多次
>    >
>    > b. Linux上高效的sendfile系统调用不需要把磁盘中的数据读取到用户态内存再发送到网络中去
>    >
>    > c. 在发送时，貌似我的开发机上文件不允许访问
>
> 9. 多线程下载和断点续传其实，首先Nginx要支持一次请求只下载一个文件的一部分，这样客户端开启多个线程同时下载一份文件，其中每个线程仅下载文件的一部分。断点续传，客户端记录了下载偏移量，带上偏移量参数请求就好了，range协议
>
> 10. 用C++编写Nginx模块，原来的C模块，依然使用C编译器，C++模块采用C++编译器，因为C++是向下兼容C的，所以链接器采用C++就好了，但因为nginx的库是C语言的，想要在C++中使用Nginx库，需要将其用extern "C"{}包围起来