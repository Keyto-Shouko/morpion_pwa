<script setup lang="js">
</script>

<script>

//morpion grid
export default {
  data() {
    return {
      bordState: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      columns: 3,
      rows: 3,
      isCrossPlayer: true,
    }
  },
  methods: {
    applySymbol(rowIndex, columIndex, isCrossPlayer) {
      console.log(this.bordState)
      if (this.bordState[rowIndex][columIndex] != "") {
        return
      }
      if (this.isCrossPlayer) {
        this.bordState[rowIndex][columIndex] = "X"
      } else {
        this.bordState[rowIndex][columIndex] = "O"
      }
      this.checkWin(rowIndex, columIndex)
      this.isCrossPlayer = !isCrossPlayer
    },
    checkWin(row, column) {
      //check if there is a winner
      //check if there is a draw
      // let symbolToCheck = this.isCrossPlayer ? "X" : "O"
      // console.log("symbolToCheck", symbolToCheck)
      // const filterXBoard = this.bordState.filter(symbol => symbol[0][0] == symbolToCheck)
      // console.log(filterXBoard)
      //check where the player played his symbol
      console.log("row", row)
      console.log("column", column)
      if (row == 0 && column == 0 || row == 0 && column == 2 || row == 2 && column == 0 || row == 2 && column == 2) {
        console.log("diagnonals")
        /*if(row-1<0){

        }*/
        //check if the player won
        //check if the player draw
      }
      else if (row == 0 && column == 1 || row == 1 && column == 0 || row == 1 && column == 2 || row == 2 && column == 1) {
        console.log("Losange")
        //check if the player won
        //check if the player draw
      }
      else if (row == 1 && column == 1) {
        console.log("center")
      }
      //this is the cheat code to use the notification
      if (this.bordState[0][0] == "X" && this.bordState[0][1] == "X" && this.bordState[0][2] == "X") {
        //send a notification to the player
        //check if he granted access to notifications
        //if yes send a notification
        let notifTitle = "Notif Title";
        let notifBody = 'Créé par  Moi.';
        let notifImg = 'data/img/chad.png';
        let options = {
          body: notifBody,
          icon: notifImg
        }
        new Notification(notifTitle, options);
      }
    },
    promptNotification() {
      Notification.requestPermission().then(function (result) {
        console.log(result);
      });
    }
  }
}
</script>
<template>
  <h1>Morpion</h1>
  <table>
    <th v-for="(column, columIndex) in columns">
      <tr v-for="(row, rowIndex) in rows">
        <td v-on:click="applySymbol(rowIndex, columIndex, isCrossPlayer)">
          {{ bordState[rowIndex][columIndex] }}
        </td>
      </tr>
    </th>
  </table>
  <button v-on:click="promptNotification">Get Notifications ?</button>
</template>

<style scoped>
table td {
  border: 1px solid #000000;
}

td {
  height: 80px;
  width: 160px;
  text-align: center;
  vertical-align: middle;
}
</style>
