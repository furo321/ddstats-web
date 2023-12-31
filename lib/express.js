import bodyParser from "body-parser"
import njk from "nunjucks"
import express from "express"
import macros from "./macros.js"
import router from "../routes/router.js"

/**
 * This function sets up express and nunjucks.
 * @param {express.Application} expressApp
 */
export default function setupExpress(server) {
    let nunjucks = njk.configure(
        "views",
        {
            autoescape: true,
            lstripBlocks: true,
            trimBlocks: true,
            express: server,
        }
    )
    
    nunjucks.addGlobal("ordinal", macros.ordinal)
    nunjucks.addGlobal("time_format", macros.timeFormat)
    nunjucks.addGlobal("plural", macros.plural)
    nunjucks.addGlobal("fancy_time", macros.fancyTime)
    nunjucks.addGlobal("current_date", macros.getCurrentDate)
    nunjucks.addGlobal("truncate_string", macros.truncateString)
    nunjucks.addGlobal("mapCountryCode", macros.mapCountryCode)


    server.disable("x-powered-by")

    server.use("/assets", express.static("assets"))
    server.use(bodyParser.urlencoded({ extended: false }))

    server.use(router)
}
