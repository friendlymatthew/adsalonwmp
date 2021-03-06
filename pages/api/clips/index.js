import dbConnect from "../../../utils/dbConnect";
import Clip from "../../../models/Clip";

//connects database to web application
dbConnect();

export default async(req, res) => {
    const { method } = req;

    switch(method) {

        //POST REQUEST
        case "POST":
            try {
                const clip = await Clip.create(req.body);
                res.status(201).json({success: true, data: clip })
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        
        //ERROR HANDLING
        default:
            res.status(400).json({success: false});
            break;
    }
}