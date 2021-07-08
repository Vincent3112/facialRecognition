process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const socketio = require('socket.io-client')

const axios = require('axios')

const instance = axios.create({ baseURL: 'https://kong.tls.ai/bt/api/' })

async function _login(username = 'AnyVisionAdmin', password = 'AVpa$$word!') {

  return instance.post('/login', { username, password })

}

async function _confirmEula(username, password) {

  return instance.post('/eula', { username, password })

}

async function getToken(username, password) {

  const { data: { token, isEulaConfirmed } } = await _login(username, password)

  if (!isEulaConfirmed) {

    await _confirmEula(username, password)

    return getToken(username, password)

  }

  return token

}

async function connectToSocket() {

  const token = await getToken()

  const socket = await socketio('https://kong.tls.ai/', {

    rejectUnauthorized: false,

    path: '/bt/api/socket.io',

    transports: ['websocket'],

    query: {

      token

    }

  })

  // Error events

  const errSocket = ['connect_error', 'connect_timeout', 'reconnect_error', 'reconnect_failed', 'error', 'disconnect']

  errSocket.forEach(e => socket.on(e, err => console.error(`Error: ${e}`, err)))

  socket.on('connect', () => {


    instance
    .get('/bt-licensing/details/system-expiry-date', { headers : { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzExZjBmLWVjMzYtNGI1YS1iMDE3LTQ0YzAwNGNlNGRlNyIsInJvbGVJZCI6ImJkYzY4OTNmLTE0YjEtNGMwOS1hY2VkLTVhMzMxOTdkYTdmNSIsImlzRGF0YVJlc3RyaWN0ZWQiOmZhbHNlLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwiaXNBY3RpdmUiOnRydWUsImxvY2FsZSI6ImVuX3VzIiwidGltZXpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwidXNlckdyb3VwSWQiOiIwMDAwMDAwMC0wMjAwLTc5MTItNTVhNy00NThkNDBkYTg3NjUiLCJqdGkiOiI4MjJjNDBjYS04Y2IxLTRjMTMtYTE3Zi1lZmUyMjY2ZWFlYTQiLCJpYXQiOjE2MjUyMjEyNzgsImV4cCI6MTYyNTI1NzI3OH0.HVOPxQZODbSQECSHT5Z_xMQPJ1kuAst9bIdsVwAtyzi5RS3miWXyUWvnPDvRFmDObBW7T-s_BmMvB8jGesVssMQrtqZqm8LNloGrrB1OSjaaj-n4AHWt2aP3SVelL2rYOrWHkA56kbJPC4miSRL9tV6hgpZ12nDbBQ1ngMJe9A_jo-Jed7vzk0oi5bP5BQiSh-be2_RSxSsmngsgRXbRufegi9BTc4E6IszJpQWtRu17SEOySGgMZ01ec3g8ujNiAUSsgHrTjLwNRF6I9TB0LOdRdUNKXoefEflupYgKWSVZmJH8HTzg2wESIPpi-UFxR4IkDnC0EL3XL6yLhsNlKeFY6F9r4tlvBzrmgBRNL-gCEfbLyujHn8bdA7H9Qa6P-MR3dU69C-2XLeRc4ExjYxH9uMBw50pWmtaaI1EiURelB2sTynpE7xG37SgpnZm1c6d6FwUGGE3-PizmaLMMW3BZvPcqGkYPXQC_BRHm676EXK5sxZOBJ6kfkkdsdvKK1_PC41oDtpnZ6ufW4ZebdAy3ojPHV4hNSSN3ROFm0aR1ClZJ2oXHC4BfOb-pnuLIQmcKGIGZFrF6CDGhIYHmDknbYEq4z9R27xAT-BWsLwYCSR-nmeYpWtvJJq6n6svSjhfvGYSH2cqimb41mqK3O57MjTiF6YFL3Iza9PpU-r4'}})
    .then(
      (resp) => {
        console.log("LICENSE EXPIRY DATE IS : " + resp.expiryData);
      }
    )
    .catch(console.error)


    instance
      .get('/health', { headers : { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzExZjBmLWVjMzYtNGI1YS1iMDE3LTQ0YzAwNGNlNGRlNyIsInJvbGVJZCI6ImJkYzY4OTNmLTE0YjEtNGMwOS1hY2VkLTVhMzMxOTdkYTdmNSIsImlzRGF0YVJlc3RyaWN0ZWQiOmZhbHNlLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwiaXNBY3RpdmUiOnRydWUsImxvY2FsZSI6ImVuX3VzIiwidGltZXpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwidXNlckdyb3VwSWQiOiIwMDAwMDAwMC0wMjAwLTc5MTItNTVhNy00NThkNDBkYTg3NjUiLCJqdGkiOiI4MjJjNDBjYS04Y2IxLTRjMTMtYTE3Zi1lZmUyMjY2ZWFlYTQiLCJpYXQiOjE2MjUyMjEyNzgsImV4cCI6MTYyNTI1NzI3OH0.HVOPxQZODbSQECSHT5Z_xMQPJ1kuAst9bIdsVwAtyzi5RS3miWXyUWvnPDvRFmDObBW7T-s_BmMvB8jGesVssMQrtqZqm8LNloGrrB1OSjaaj-n4AHWt2aP3SVelL2rYOrWHkA56kbJPC4miSRL9tV6hgpZ12nDbBQ1ngMJe9A_jo-Jed7vzk0oi5bP5BQiSh-be2_RSxSsmngsgRXbRufegi9BTc4E6IszJpQWtRu17SEOySGgMZ01ec3g8ujNiAUSsgHrTjLwNRF6I9TB0LOdRdUNKXoefEflupYgKWSVZmJH8HTzg2wESIPpi-UFxR4IkDnC0EL3XL6yLhsNlKeFY6F9r4tlvBzrmgBRNL-gCEfbLyujHn8bdA7H9Qa6P-MR3dU69C-2XLeRc4ExjYxH9uMBw50pWmtaaI1EiURelB2sTynpE7xG37SgpnZm1c6d6FwUGGE3-PizmaLMMW3BZvPcqGkYPXQC_BRHm676EXK5sxZOBJ6kfkkdsdvKK1_PC41oDtpnZ6ufW4ZebdAy3ojPHV4hNSSN3ROFm0aR1ClZJ2oXHC4BfOb-pnuLIQmcKGIGZFrF6CDGhIYHmDknbYEq4z9R27xAT-BWsLwYCSR-nmeYpWtvJJq6n6svSjhfvGYSH2cqimb41mqK3O57MjTiF6YFL3Iza9PpU-r4'}})
      .then(
        (res) => {
          console.log("API STATUS IS : " + res.data["health-service"][0].status);
        }
      )
      .catch(console.error)

    socketio(`https://kong.tls.ai/bt/api/socket.io/?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzExZjBmLWVjMzYtNGI1YS1iMDE3LTQ0YzAwNGNlNGRlNyIsInJvbGVJZCI6ImJkYzY4OTNmLTE0YjEtNGMwOS1hY2VkLTVhMzMxOTdkYTdmNSIsImlzRGF0YVJlc3RyaWN0ZWQiOmZhbHNlLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwiaXNBY3RpdmUiOnRydWUsImxvY2FsZSI6ImVuX3VzIiwidGltZXpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwidXNlckdyb3VwSWQiOiIwMDAwMDAwMC0wMjAwLTc5MTItNTVhNy00NThkNDBkYTg3NjUiLCJqdGkiOiI4MjJjNDBjYS04Y2IxLTRjMTMtYTE3Zi1lZmUyMjY2ZWFlYTQiLCJpYXQiOjE2MjUyMjEyNzgsImV4cCI6MTYyNTI1NzI3OH0.HVOPxQZODbSQECSHT5Z_xMQPJ1kuAst9bIdsVwAtyzi5RS3miWXyUWvnPDvRFmDObBW7T-s_BmMvB8jGesVssMQrtqZqm8LNloGrrB1OSjaaj-n4AHWt2aP3SVelL2rYOrWHkA56kbJPC4miSRL9tV6hgpZ12nDbBQ1ngMJe9A_jo-Jed7vzk0oi5bP5BQiSh-be2_RSxSsmngsgRXbRufegi9BTc4E6IszJpQWtRu17SEOySGgMZ01ec3g8ujNiAUSsgHrTjLwNRF6I9TB0LOdRdUNKXoefEflupYgKWSVZmJH8HTzg2wESIPpi-UFxR4IkDnC0EL3XL6yLhsNlKeFY6F9r4tlvBzrmgBRNL-gCEfbLyujHn8bdA7H9Qa6P-MR3dU69C-2XLeRc4ExjYxH9uMBw50pWmtaaI1EiURelB2sTynpE7xG37SgpnZm1c6d6FwUGGE3-PizmaLMMW3BZvPcqGkYPXQC_BRHm676EXK5sxZOBJ6kfkkdsdvKK1_PC41oDtpnZ6ufW4ZebdAy3ojPHV4hNSSN3ROFm0aR1ClZJ2oXHC4BfOb-pnuLIQmcKGIGZFrF6CDGhIYHmDknbYEq4z9R27xAT-BWsLwYCSR-nmeYpWtvJJq6n6svSjhfvGYSH2cqimb41mqK3O57MjTiF6YFL3Iza9PpU-r4`).on('recognition:created', () => console.log('CA MAAARCHE !'))


    // instance
    //   .post('/notifications/subscribe', { headers : { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzExZjBmLWVjMzYtNGI1YS1iMDE3LTQ0YzAwNGNlNGRlNyIsInJvbGVJZCI6ImJkYzY4OTNmLTE0YjEtNGMwOS1hY2VkLTVhMzMxOTdkYTdmNSIsImlzRGF0YVJlc3RyaWN0ZWQiOmZhbHNlLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwiaXNBY3RpdmUiOnRydWUsImxvY2FsZSI6ImVuX3VzIiwidGltZXpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwidXNlckdyb3VwSWQiOiIwMDAwMDAwMC0wMjAwLTc5MTItNTVhNy00NThkNDBkYTg3NjUiLCJqdGkiOiJjNDkxNDA4MC03MmM5LTRmZmMtYjI4Yi01NDU4MzljZjE3NzIiLCJpYXQiOjE2MjQ4ODE4ODIsImV4cCI6MTYyNDkxNzg4Mn0.Nt1DBK1VGyp722iR9q9rY0NrlXU68oulr5RyG0DmPmkFkftCKWxJGHAs-PNMESyOI9PKZ2fmaHye0w6Sto9GPP7AO3dEm8qb1coTwhFD-Ukw2WxoqI8xcCYgtXfSb8vsr7nYsOOB_ja4FEJ4cZsa0c6vxxUe840MtRudztBje30s9yGSCglU3nXvVOnNijfzmH36uT0HxkkBP3jV6eKudegZ07oSsq6pfCa1iGG5wxlI_LqTKCISCiqEqNjo_vgFaJmZ2t3Hyhx1NAPiAeGdoMIDQ3oK-VH0C54C110gegr8vPv4CdXkaf9kviNhMlw2gKPCdgRmHLVPa92G7CojcIOch5RWVpY0Dohca9rKNxVzBYzsubNOQhoniKsyaY4z1KhP88OKsR9dNbKAYfmFZumneG-UbIDV6K5VooCBcJY7nJhhHMztsEhZOFPBiCNBlYWxLfO4sEkPQQ1DYlqv--ojNuRHWh-NIESdXaQ5AlFvJ1EggFxstg39a1nUpsDeTfsMmye1naaiFj1YpqdcVE-J034VLn3qdTUC8GSSwl4kutlN3fe7u-Viqy84oaT_Y9T1SCvhK63Uf0EDTguKWoTqia3W4MwktXIB2mgrkQ2CkAGri8ylSSYWMHgDgLnNFoubI2VkA8vrOlUnyuFEo7_zBCpjYA4M9JnPTaT7Cvc'}})
    //   .then(
    //     (res) => {
    //       console.log(res);
    //     }
    //   )
    //   .catch(console.error)


    console.log('connected to socket!')

  })

  socket.on('track:created', track => {

    console.log('Got track -', track)

  })

}

connectToSocket()

  .then().catch(console.error)