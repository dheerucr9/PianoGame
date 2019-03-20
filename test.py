result = []
for i in range(0, 100, 25):
    for j in range(0, 100, 25):
         result.append(i)
         result.append(j)
print(result)
result.reverse()
print(result)

s = "varshashesh"
print(s[-4::-1])
print(s[4::-1])
print(s[3::-1])
print(s[2:-3:1])
print(s[3:])
print(s[:3])
print(s[0:1])
# print(s == s.reverse())
print(s[::2])
