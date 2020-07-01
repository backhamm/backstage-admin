<template>
  <v-model :visible.sync="showModel" :data.sync="modelData" :card-style="{width: '300px'}" @confirm="showModel = false">
    <div v-if="gameId === '1810' || gameId === '1820' ">
      <div class="result-item">有{{cardValue.slice(0, 1)}}条线中奖</div>
      <div v-if="cardValue.split('|')[1]" class="result-item">
        <span v-for="item of cardValue.split('|')[1].split(',')" :key="item">第{{Number(item.split('-')[0]) + 1}}条线中奖{{item.split('-')[1]}}倍；</span>
      </div>
      <div v-else class="result-item">中奖线路为空</div>
      <div class="result-item">获得免费拉霸次数{{cardValue.split('|')[2].split(',')[0]}}次；获得水果玛丽{{cardValue.split('|')[2].split(',')[1]}}次;</div>
      <div class="result-item">开奖结果：</div>
      <div v-for="(cardArr, i) of modelData.list" :key="i">
        <img v-for="(card, index) of cardArr" :key="card + index" class="result-img" :src="chessImg(card)" alt="">
      </div>
    </div>
    <div v-else-if="gameId === '1960' || gameId === '1940'">
      <div class="result-item">开奖结果：</div>
      <img :src="chessImg(cardValue.split('-')[0])" alt="">
    </div>
    <template v-else>
      <div v-for="(cardArr, i) of modelData.list" :key="i" class="result-item" :class="showRedText(i)">
        <div v-if="gameId === '600'">
          <div>{{cardArr.imgTitle}}</div>
          <img v-for="(item, index) of cardArr.cardList" :key="item + index" class="result-img" :src="chessImg(item)" alt="">
          <div>{{cardArr.operate}}</div>
        </div>
        <div v-else-if="gameId === '630'">
          <div>{{imgTitle(i)}}</div>
          <div v-for="(card, cardIndex) of cardArr" :key="cardIndex">
            <img v-for="(item, index) of card" :key="item + index" class="result-img" :src="chessImg(item)" alt="">
          </div>
        </div>
        <div v-else-if="unmanned(cardArr)">{{i + 1}}号位无人</div>
        <div v-else>
          <div>{{imgTitle(i)}}</div>
          <img v-for="(item, index) of cardArr" :key="item + index" class="result-img" :src="chessImg(item)" alt="">
        </div>
      </div>
    </template>
    <div v-if="footerText" class="result-item red">{{footerText}}</div>
  </v-model>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {chessList} from './GameResultsData'

  export default {
    name: '',
    data() {
      return {
        showModel: false,
        modelData: {
          type: 'slot',
          title: '游戏结果',
          btnType: 'close',
          list: []
        },
        chessList,
        currentGame: null,
        gameClass: null
      }
    },
    computed: {
      ...mapGetters(['cardObj']),
      cardValue() {
        const cardValue = this.cardObj.cardValue.toLowerCase()
        if (this.gameId === '930') {
          return cardValue.split('').filter((item, i) => i % 11 !== 0 || i > 50).join('')
        }
        return cardValue
      },
      gameId() {
        if (!this.currentGame) return
        return this.currentGame.gameId
      },
      footerText() {
        if (!this.currentGame) return
        const cardValue = this.cardValue
        const hideList = ['720', '900', '210', '600', '200', '630', '1810', '1820']
        if (hideList.includes(this.gameId)) {
          return ''
        } else if (this.gameId === '930') {
          let winner = ''
          const list = ['天', '地', '玄', '黄', '庄']
          const winnerList = cardValue.slice(51).split('0')
          winnerList.forEach(item => {
            winner += list[item - 1] + '、'
          })
          return `${winner}是赢家`
        } else if (this.gameId === '1960' || this.gameId === '1940') {
          return `赔率：${cardValue.split('-')[1]}倍`
        }
        const {slice, sliceText} = this.currentGame
        return `${Number(cardValue.slice(slice[0], slice[1])) + 1}号位是${sliceText}`
      }
    },
    watch: {
      cardObj({gameClass, gameId}) {
        this.gameClass = gameClass
        this.currentGame = this.chessList[gameClass].find(item => item.gameId === gameId)
        this.showModel = true
        const {group, size} = this.currentGame
        this.modelData.list = (() => {
          switch (gameId) {
            case '600':
              return this.transformEsydArr()
            case '630':
              return this.transformSssArr()
            case '1810': case '1820':
              return this.transformSgjArr()
            default:
              return this.transformArr(group, this.cardValue, false, size || 2)
          }
        })()
      }
    },
    methods: {
      // 循环写法
      // transformArr(size, group, str = val) {
      //   let arr = []
      //   const length = Math.floor(str.length / size)
      //   for (let a = 0; a < length; a++) {
      //     const card = str.slice(a * size, a * size + size)
      //     arr.push(card)
      //     if ((a + 1) % group === 0) {
      //       this.modelData.push(arr)
      //       arr = []
      //     }
      //   }
      // },
      // 通用解牌方法
      transformArr(group, str, stop, size) {
        const arr = []
        const cardLength = Math.floor(str.length / group)
        for (let i = 0; i < cardLength; i++) {
          const index = i * group
          let card = str.slice(index, index + group)
          if (!stop) {
            card = this.transformArr(size, card, true)
          }
          arr.push(card)
        }
        return arr
      },
      // 二十一点
      transformEsydArr() {
        const arr = []
        const operate = ['本局没有特殊操作', '本局购买了保险', '本局进行了加倍操作', '本局进行了保险和加倍操作']
        this.cardValue.split(',').forEach(card => {
          const index = Number(card.slice(0, 1)) + 1
          // 如果有分牌或在其他座位下注
          if (card.indexOf('-') > -1 || card.indexOf('|') > -1) {
            card.split('|').forEach(betItem => {
              const betIndex = Number(betItem.slice(0, 1)) + 1
              const title = `${index}号玩家在${betIndex}号位`
              if (betItem.indexOf('-') > -1) {
                betItem.split('-').forEach((partItem, partIndex) => {
                  const partStr = partItem.slice(!partIndex ? 1 : 0)
                  const partList = this.transformArr(2, partStr.slice(1), true)
                  arr.push({imgTitle: `${title}的${!partIndex ? '牌为' : '分牌为'}：`, operate: operate[partStr.slice(0, 1)], cardList: partList})
                })
              } else {
                const betList = this.transformArr(2, betItem.slice(2), true)
                arr.push({imgTitle: `${title}的牌为：`, operate: operate[betItem.slice(1, 2)], cardList: betList})
              }
            })
          } else {
            const cardList = this.transformArr(2, card.slice(2), true)
            const imgTitle = index !== 6 ? `${index}号位玩家手牌：` : '庄家的手牌：'
            arr.push({imgTitle, operate: operate[card.slice(1, 2)], cardList})
          }
        })
        return arr
      },
      // 十三水
      transformSssArr() {
        const arr = []
        this.cardValue.split(';').forEach(card => {
          const cardInfo = []
          card.split(',').forEach((item, i, arr) => {
            if (arr.length === 1) {
              cardInfo.push(this.transformArr(2, item.slice(0, -3), true))
            } else if (item.length > 1) {
              cardInfo.push(this.transformArr(2, item.slice(0, -1), true))
            }
          })
          arr.push(cardInfo)
        })
        return arr
      },
      // 水果机
      transformSgjArr() {
        const arr = []
        let card = []
        const cardValue = this.cardValue.split('|')[3].split(',')
        if (cardValue.length === 2) {
          return [cardValue[0]]
        } else {
          cardValue.forEach((item, i) => {
            card.push(item)
            if ((i + 1) % 5 === 0) {
              arr.push(card)
              card = []
            }
          })
        }
        return arr.reverse()
      },
      // 开奖结果图片的标题
      imgTitle(i) {
        if (this.gameId === '720' && i === 3) {
          return `${i + 1}号位为庄家，手牌：`
        }
        switch (this.gameId) {
          case '930':
            return `${['天', '地', '玄', '黄', '庄'][i]}号位玩家手牌：`
          case '900':
            return `${['龙开牌', '虎开牌'][i]}：`
          case '210':
            return `${['黑方手牌', '红方手牌'][i]}：`
          case '200':
            return `${['黑牛手牌', '红牛手牌'][i]}：`
          default:
            return `${i + 1}号位玩家手牌：`
        }
      },
      // 是否有玩家
      unmanned(val) {
        return val.every(item => Number(item) === 0)
      },
      // 棋牌图片路径
      chessImg(val) {
        return require(`@/assets/${this.gameClass}/${this.currentGame.img}/${val}.png`)
      },
      // 当前用户显示红色字体
      showRedText(i) {
        return i === Number(this.cardObj.chairId) && 'red'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .result-item {
    line-height: 1.5;
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }

    .result-img {
      margin: 5px 0 2px;
    }
  }

  .red {
    color: red;
  }
</style>
