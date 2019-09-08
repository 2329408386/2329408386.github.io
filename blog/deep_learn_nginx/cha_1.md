# 第一章 研究Nginx前的准备工作



> 1. Nginx优秀的设计使其成为了优秀服务器的代名词，越来越多的大型网站开始选择Nginx作为服务器
> 2. Nginx优点：更快，高扩展性（主要因为nginx设计时耦合度低），高可靠性（master->worker机制），高并发（10万以上并发连接）
> 3. 开发Nginx扩展包需要的软件：gcc，g++，pcre库（nginx正则），zlib（对http包压缩），openssl（ssl协议）
> 4. Linux内核参数优化：默认的Linux内核参数考虑的是最通用的场景，这不符合支持高并发访问的web服务器的定义，所以需要配置/etc/sysctl.conf，在其后添加如下内容：

> ```conf
> fs.file-max = 99999
> 
> net.ipv4.tcp_tw_reuse = 1
> net.ipv4.tcp_keepalive_time = 600
> net.ipv4.tcp_fin_timeout = 30
> net.ipv4.tcp_max_tw_buckets = 5000
> net.ipv4.ip_local_port_range = 1024   61000
> net.ipv4.tcp_rmem = 4096 32768 261142
> net.ipv4.tcp_wmem = 4096 32768 261142
> 
> net.core.netdev_max_backlog = 8096
> net.core.rmem_default = 261144
> net.core.wmem_default = 261144
> net.core.rmem_max = 2097152
> net.core.wmem_max = 2097152
> 
> net.ipv4.tcp_syncookies = 1
> net.ipv4.tcp_max_syn_backlog = 1024
> ```
>
> 这里解释几个常见的参数：
>
> > a. file-max:最大句柄数，直接决定最大并发数
> >
> > b.  tcp_keep_alive_time: tcp长连接时，保持连接的时间
> >
> > c. ip_local_port_range: udp与tcp连接中，本地端口的取值范围
> >
> > d. Net.ipv4.tcp_rmem:tcp连接时接收缓存（滑动窗口协议）的最小，默认，最大值
> >
> > e. Net.ipv4.tcp_wmem:tcp发送缓存（滑动窗口协议）的最小，默认，最大值
> >
> > 其余一些参数需要详细解释的，请联系我lichengpeng@baidu.com
> >
> > 

> 5. Nginx下载：http://nginx.org/en/download.html，源码解压：tar -zxvf nginx*.tar.gz
>
> 6. Nginx编译安装：快速安装，进入刚才解压nginx目录，
>
>    ```  (a)  ./configure   (b)  make  (c)  make install  ```，nginx的安装路径在/usr/local/nginx目录下
>
> 7. ./configure命令执行后，会在nginx源文件目录下生成一个objs目录，目录下面的ngx_modules.c文件有一个数组ngx_modules，这个数组非常重要，它指定了每个模块在nginx中的优先级，排在ngx_modules模块靠前的模块会被优先处理
>
> 8. 常用命令：进入nginx的安装目录，``` (a) ./sbin/nginx : ```打开nginx，```(b) ./sbin/nginx -s stop :```关闭nginx，``` (c) ./sbin/nginx -s reload: ``` 重启nginx，``` (d) ./sbin/nginx -V :```显示编译参数，``` (e) ./sbin/nginx  -t :```测试配置文件是否有误
>
>    