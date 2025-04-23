//*      .oo         o   .oPYo.                                            .oPYo. .oPYo. .oPYo. oooooo
//*     .P 8             8.                                                    `8 8  .o8     `8 8
//*    .P  8 .oPYo. o8   `boo   `o  o' .oPYo. oPYo. .oPYo. .oPYo. .oPYo.      oP' 8 .P'8    oP' 8pPYo.
//*   oPooo8 8    8  8   .P      `bd'  8    8 8  `' 8oooo8 Yb..   Yb..     .oP'   8.d' 8 .oP'       `8
//*  .P    8 8    8  8   8       d'`b  8    8 8     8.       'Yb.   'Yb.   8'     8o'  8 8'         .P
//* .P     8 8YooP'  8   `YooP' o'  `o 8YooP' 8     `Yooo' `YooP' `YooP'   8ooooo `YooP' 8ooooo `YooP'
//* ..:::::..8 ....::..:::.....:..:::..8 ....:..:::::.....::.....::.....:::.......:.....:.......:.....:
//* :::::::::8 ::::::::::::::::::::::::8 ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* :::::::::..::::::::::::::::::::::::..::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import app from './src/app.js'
import env from './src/Configs/envConfig.js'
import { sequelize } from './src/Configs/database.js'
import { pepe } from './pepito.js'

app.listen(env.Port, async () => {
  try {
    await sequelize.authenticate()
    console.log(`Server is listening on http://localhost:${env.Port}\nServer in ${env.Status}😉`)
    if (env.Status === 'development') {
      await sequelize.sync({ force: false })
      //await pepe()

      console.log(`Swagger is running on http://localhost:${env.Port}/api-docs`)
    }
  } catch (err) {
    console.error('Error initializing server: ', err)
  }
})
