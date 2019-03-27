import random
dictionary = {i:0 for i in range(7)}
count  = 0
ans = []
while count < 14:
    temp = random.randint(0,6)
    if dictionary[temp] < 2:
        dictionary[temp] += 1
        ans.append(temp)
        count += 1
string = "27384910"

x = ""
y = ""
for i in ans:
    x += string[i]
    y += string[i+1]

print(x)
print(y)
