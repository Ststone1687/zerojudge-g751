import sys
from itertools import zip_longest
import datetime
import codecs

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
datetime_now = datetime.datetime.now()
time_range = datetime.timedelta(hours = 8)
new_time =datetime_now+time_range
x1 = new_time.year
x2 = new_time.month
x3 = new_time.day

def f(x:int):
    x = x%30000
    return ((x*x)+87-int(x/3)-(x%7))%48763

def g(x:int):
    x = x%30000
    return ((x-1)*(x+2)+(x/4)-(x%3))%48763

def q(x:int):
    x = x%30000
    x = x+x*x+(449*x)%48763
    return ((x%3)+(x%5)+(x%7)+(x%2)+(x%11)+(x%101))%48763

def swap(a,b):
    return b,a

day_lucky_number = int((f(x1)+g(x2)+q(x3))%48763)

#def random_swap():
    

result = {"$JUDGE_RESULT":"", "$LINECOUNT":"","$USEROUT":"","$SYSTEMOUT":"","$MESSAGE":""}

def main(argv):
    if len(argv) != 3:
        print ('special.py [inputfile] [ansfile] [outputfile]')
        sys.exit(2)

    infile = open(argv[0], 'r', encoding='UTF-8')
    ansfile = open(argv[1], 'r', encoding='UTF-8')
    outfile = open(argv[2], 'r', encoding='UTF-8')

    for index, (out, ans) in enumerate(zip_longest(outfile.readlines(), ansfile.readlines()), 1):
        if ans is None :
            result["$JUDGE_RESULT"] = "OLE"
            result["$LINECOUNT"]= str(index)
            result["$USEROUT"]=out.strip()
            result["$MESSAGE"]="多餘的輸出。"
            return
        if out is None :
            result["$JUDGE_RESULT"]="WA"
            result["$LINECOUNT"]=str(index)
            result["$MESSAGE"]="沒有完整輸出答案。"
            return
        answer_array = [4,8,7,6,3,4,8,7,6,3,4,8,7,6,3,4,8,7,6,3,4,8,7,6,3]
        total = 0
        out = out.replace('\n','')
        for i in out:
            total += ord(i)
            answer_array.append(ord(i))

        total = int((f(total)+g(total)+q(total))%48763)
        #random_swap()
        for i in range(len(answer_array)):
            seed = int((day_lucky_number+f(total)+g(total)+q(total))%48763)
            if(i%3==0):
                seed = int(((seed+f(answer_array[i]+day_lucky_number)))%48763)
            elif(i%3==1):
                seed = int(((seed+g(answer_array[i])))%48763)
            elif(i%3==2):
                seed = int(((seed+q(answer_array[i])))%48763)
            px,py = i,int((f(seed)+g(seed+day_lucky_number)+q(seed+day_lucky_number))%len(answer_array))
            answer_array[px],answer_array[py] = swap(answer_array[px],answer_array[py])

        score = 0
        for i in range(len(answer_array)):
            if(i%3==0):
                score = int(((score+f(answer_array[i])))%48763)
            elif(i%3==1):
                score = int(((score+g(answer_array[i]+day_lucky_number)))%48763)
            elif(i%3==2):
                score = int(((score+q(answer_array[i]+day_lucky_number)))%48763)
        score = round(score/487.63,2)
        ans_score = int(ans.strip())
        if(score<ans_score):
            result["$JUDGE_RESULT"]="WA"
            result["$LINECOUNT"]=str(index)
            result["$USEROUT"]=out.strip()
            result["$SYSTEMOUT"]="本題不提供正確答案。"
            result["$MESSAGE"]="。獲得分數："+str(score)+"，未滿足通過條件"+str(ans_score)+"分。"
            return
    result["$JUDGE_RESULT"]="AC"
    #result["$MESSAGE"]="您輸出的字串是："+out.strip()+"獲得分數："+str(score)

if __name__ == "__main__":
    main(sys.argv[1:])
    for key in result:
        print(key+"="+result[key])