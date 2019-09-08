# 第4章 谈谈分词

> 1. 最简单的分词方法，根据一个句子，从左到右扫描，最长匹配词；但很多情况容易出错：发展-中国-家，其实应该是：发展-中-国家；北京大学-生，其实应该是：北京-大学生；
>
> 2. 用统计学的原理则是：假设一个句子可以同时分割成下列几种情况：
>
>    > * A<sub>1</sub>, A<sub>2</sub>, A<sub>3</sub>, … , A<sub>m</sub>
>    > * B<sub>1</sub>, B<sub>2</sub>, B<sub>3</sub>, … , B<sub>n</sub>
>    > * C<sub>1</sub>, C<sub>2</sub>, C<sub>3</sub>, … , C<sub>k</sub>
>
>    最好的分词方法是保证分完词之后，这个句子出现的概率最大
>
> 3. 即使使用再好的分词模型也不能做到100%完美，因为不同人对一个句子的理解可能会不同

# 第5章 隐含马尔可夫模型

> 1. 到目前为止，隐含马尔可夫一直被认为是解决大多数自然语言处理问题最为快速、有效的方法
>
> 2. 通信模型：![5_1](/Users/lichengpeng/Documents/learn/2329408386.github.io/static/the_beauty_of_math/5_1.png)
>
>    这其中，通信的6要素为，发送者（信息源），信道，接收者，信息，上下文和编码
>
> 3. 所谓的语音识别，其实就是根据声学信号来推测说话者的意思；利用计算机，根据接收到的英语信息，推测说话者的汉语意思，就是机器翻译；如果要根据带有拼写错误的语句推测说话者想表达的正确意思，就是自动纠错。这样，几乎所有的自然语言处理问题都可以等价成通信的解码问题
>
> 4. 怎样通过观测信号O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, … 来推测源信息S<sub>1</sub>，S<sub>2</sub>，S<sub>3</sub>，...只需要从所有的源信息中找到最可能产生观测信息的那一个信息，即求条件概率P(S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, … | O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, …) 的最大值时的S<sub>1</sub>，S<sub>2</sub>，S<sub>3</sub>，…。
>
>    > 公式为：S<sub>1</sub>，S<sub>2</sub>，S<sub>3</sub>，… = Arg Max P(S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, … | O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, …) 
>    >
>    > 利用贝叶斯公式：S<sub>1</sub>，S<sub>2</sub>，S<sub>3</sub>，… = P( O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, … | S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, … ) · P(S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, … ) / P( O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, …)
>    >
>    > 因为： P( O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, …)为已知的，概率为1
>    >
>    > 所以：S<sub>1</sub>，S<sub>2</sub>，S<sub>3</sub>，… = P( O<sub>1</sub>, O<sub>2</sub>, O<sub>3</sub>, … | S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, … ) · P(S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, … )
>
> 5. 隐含马尔可夫模型，其实就是基于马尔可夫假设的，一件事发生的概率只和前一件事有关