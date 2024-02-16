import { registrarBannerService } from "../services/bannerService.js";

export const listarBanner = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export const registrarBanner = async (req, res) => {
    try {
        const file = req.file;
        const body = req.body;
        console.log(file, body);
        // await registrarBannerService()
        res.send({file, body});
    } catch (error) {
        
    }
}