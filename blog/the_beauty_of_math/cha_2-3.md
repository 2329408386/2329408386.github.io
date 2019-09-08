# 第2章 自然语言处理——从规则到统计

> 1. 机器智能并不是计算机理解了自然语言才实现的，它靠的是大量的数据，靠的是统计学
> 2. 一门语言，从设计开始，就注定是无穷的，所以从规则来定义，源头上就是错了，这就是从规则到统计的根本原因

# 第3章 统计语言模型

> 1. 一个句子是否合理，取决于它出现的可能性大小，也就是它的概率
>
> 2. 假设S表示一个有意义的句子，由词w<sub>1</sub>, w<sub>2</sub>, … ,w<sub>n</sub> 组成，所以： 
>
>    P(S) = P(w<sub>1</sub>, w<sub>2</sub>, … ,w<sub>n</sub>) = P(w<sub>1</sub>) · P(w<sub>2</sub> | w<sub>1</sub>) · P(w<sub>3</sub> | w<sub>1</sub>, w<sub>2</sub>) ··· P(w<sub>n</sub> | w<sub>1</sub>, w<sub>2</sub>, w<sub>3</sub>, … ,w<sub>n-1</sub>)
>
> 3. 第i个词出现的概率是在前面(i-1)个词出现的基础上，词w<sub>i</sub>出现的概率，这样计算量会非常大
>
> 4. 马尔可夫假设：任意一个词w<sub>i</sub>出现的概率只与它前面一个词w<sub>i-1</sub>有关，这样：
>
>    P(S) = P(w<sub>1</sub>, w<sub>2</sub>, … ,w<sub>n</sub>) = P(w<sub>1</sub>) · P(w<sub>2</sub> | w<sub>1</sub>) · P(w<sub>3</sub> | w<sub>2</sub>) ··· P(w<sub>n</sub> | w<sub>n-1</sub>)
>
> 5. 这样，每个项的概率就可以算出来了，根据语料库，甚至可以存储起来, P(w<sub>i</sub> | w<sub>i - 1</sub>) = P(w<sub>i - 1</sub>, w<sub>i</sub>)/P(w<sub>i-1</sub>)
>
> 6. 我们必须处理有些词出现的次数为0的情况，这样就需要对一些出现次数很少的词取折扣，也就是概率偏差