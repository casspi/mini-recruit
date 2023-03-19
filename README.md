## 20221115

`Score`

### 徽章

以下接口返回 `Data` 新增字段 `MedalList`，如果用户获得到了徽章，即这个字段列出获取的徽章id。 徽章这个估计得加一个用户确认的概念，无实际用户确认操作，返回给前端就直接认为这个徽章被用户确认过。
没有确认过的徽章在统一在首页接口 `Home/GetUserIndex` 返回。同时首页接口还得包含登录徽章的逻辑。 没有获得徽章，改字段返回空数组。

```json5
{
  // ...
  Data: {
    MedalList: [
      'id1',
      'id2'
    ],
    // ...
  }
}
```

- 测糖徽章
  + `Task/SetTestSugar`
  + `Task/SetTestSugarList`
- 分享徽章
  + `Meal/Recode`
  + `Exchange/AddRecord`
- 互动徽章
  + `Meal/AddReplay`
  + `Meal/AddLike`
  + `Exchange/AddReplay`
  + `Exchange/AddLike`
  + `Home/GetUserIndex` 首页接口，特殊一点，用户没有确认过的徽章都需要这里提示下
- 其它徽章
  + `BaiKe/GetDetail`
  + `Meal/AddFav`
  + `Exchange/AddFav`
  + `Home/SyncMotion`

### 积分

以下接口，如果用户操作有获得积分，接口返回积分字段 `Score`。没有得积分字段给 0

```json5
{
  // ...
  Data: {
    Score: 5,
    // ...
  }
}
```

- `Task/SetTestSugar` 这个以前有，可以确认下逻辑有没有问题
- `BaiKe/GetDetail`
- `Meal/Recode`
- `Meal/AddReplay`
- `Exchange/AddReplay`
