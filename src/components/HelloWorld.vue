<script setup lang="js">
</script>

<script>
window.addEventListener("deviceorientation", (event) => {
  console.log(`${event.alpha} : ${event.beta} : ${event.gamma}`);
});




//morpion grid
export default {
  data() {
    return {
      bordState: ["", "", "", "", "", "", "", "", ""],
      columns: 3,
      rows: 3,
      isCrossPlayer: true,
      registration: navigator.serviceWorker.getRegistration(),
      notificationPermissionState: Notification.permission,
      deferredPrompt: null
    }
  },
  methods: {
    applySymbol(rowIndex, columIndex, isCrossPlayer) {
      const index = rowIndex * this.columns + columIndex;
      if (this.bordState[index] !== "") {
        return;
      }
      if (this.isCrossPlayer) {
        this.bordState[index] = "X";
      } else {
        this.bordState[index] = "O";
      }
      // ...
      this.checkWin()
      this.isCrossPlayer = !this.isCrossPlayer;
    },
    checkWin() {
      //check if the bord is full and reset it
      if (!this.bordState.includes("")) {
        this.bordState = ["", "", "", "", "", "", "", "", ""],
          this.isCrossPlayer = true
      }
      const playerSymbol = this.isCrossPlayer ? 'X' : 'O';

      // Check rows
      for (let i = 0; i < this.rows; i++) {
        let win = true;
        for (let j = 0; j < this.columns; j++) {
          if (this.bordState[i * this.columns + j] !== playerSymbol) {
            win = false;
            break;
          }
        }
        if (win) {
          console.log(`Player ${playerSymbol} wins in row ${i + 1}!`);
          this.sendNotification(playerSymbol)
          return;
        }
      }

      // Check columns
      for (let i = 0; i < this.columns; i++) {
        let win = true;
        for (let j = 0; j < this.rows; j++) {
          if (this.bordState[j * this.columns + i] !== playerSymbol) {
            win = false;
            break;
          }
        }
        if (win) {
          console.log(`Player ${playerSymbol} wins in column ${i + 1}!`);
          this.sendNotification(playerSymbol)
          return;
        }
      }

      // Check diagonals
      const diagonal1 = [0, 4, 8];
      const diagonal2 = [2, 4, 6];

      const checkDiagonal = (diagonal) => {
        if (
          diagonal.every((index) => this.bordState[index] === playerSymbol)
        ) {
          console.log(`Player ${playerSymbol} wins on diagonal!`);
          this.sendNotification(playerSymbol)
          return true;
        }
        return false;
      };

      if (checkDiagonal(diagonal1) || checkDiagonal(diagonal2)) {
        return;
      }
    },
    sendNotification(symbolOfWinner) {
      //send a notification to the player
      let notification
      if (Notification.permission === 'granted') {
        notification = new Notification(`Player ${symbolOfWinner} wins`, {
          body: 'Click here to reset the game',
          // Other optional options: icon, badge, etc.
          icon: '/chad.png',
        });
        window.navigator.vibrate(100); // Vibre 'SOS' en Morse.
        if (navigator.setAppBadge) {
          console.log("The App Badging API is supported!");
          navigator.setAppBadge();
        }
      }
      // Handle notification click event
      notification.onclick = () => {
        // Handle notification click action
        console.log('Notification clicked');
        //reset the board
        this.bordState = ["", "", "", "", "", "", "", "", ""],
          //return to the X player turn
          this.isCrossPlayer = true
        // Clean up the notification
        notification.close();
      };
    },
    promptNotification() {
      console.log("permission", Notification.permission)
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();

      }
    },
    reset() {
      this.bordState = ["", "", "", "", "", "", "", "", ""],
        this.isCrossPlayer = true
    },
    async dismiss() {
      this.deferredPrompt = null;
      console.log("deferredPrompt", this.deferredPrompt)
    },
    async install() {
      console.log("installing")
      console.log("deferredPrompt", this.deferredPrompt)
      this.deferredPrompt.prompt();
    }
  },
  mounted() {
    //check if service worker is available in browser

    /*if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(reg => {
        console.log("Registration succesful, scope: " + reg.scope);
      })
        .catch(err => {
          console.log(err);
        })
    }*/

  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("e", e)
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
  updated(){
    console.log("updated")
    console.log("this.deferredPrompt", this.deferredPrompt) 
  }
}

</script>
<template>
  <h1>Morpion</h1>
  <!-- Display notification permission state -->
  <p>Notification permission state is {{ notificationPermissionState }} </p>
  <!-- Display current player -->
  <p>Current player :</p>
  <p v-if="this.isCrossPlayer">X</p>
  <p v-else>O</p>
  <table>

    <tr v-for="(row, rowIndex) in 3" :key="rowIndex">
      <td v-for="(column, columnIndex) in 3" :key="columnIndex"
        v-on:click="applySymbol(rowIndex, columnIndex, isCrossPlayer)">
        {{ bordState[rowIndex * 3 + columnIndex] }}
      </td>
    </tr>
  </table>
  <button v-on:click="promptNotification">Get Notifications?</button>
  <!-- add a reset button -->
  <button v-on:click="reset">Reset</button>
  <button id="installApp" v-on:click="install">Install</button>
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
