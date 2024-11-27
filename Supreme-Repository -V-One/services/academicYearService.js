const academicYearModel = require('../models/academicYear');

// Create Class

class academicYearServices{


    // [1] Make Academic Year
    // data -> Is an Object contains Academic Year data
    async createacademicYear(data){
        const academicYear = new academicYearModel(data);
        return await academicYear.save();

    }


    //[2] Get All Academic Years
    async getAllAcademicYears(){
        // find() in Mongo Finds All Documents
        return await academicYearModel.find();
    }


    //[3] Get a specific academic year by ID
    async getAcademicYearById(id){
        // findBYID() in mongo find document with specific id
        return await academicYearModel.findById(id);
    }



    //[4] Update an academic year by ID
    async updateAcademicYear(id,data){

        //new : true will instead give you the object after update was applied
        return await academicYearModel.findOneAndUpdate(id, data, {new:true})
    }


    //[5]Delete an academic year by ID
    async deleteAcademicYear(id) {


        return await academicYearModel.findByIdAndDelete(id);
    }






}


module.exports = new academicYearServices();