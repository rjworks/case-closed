const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqString = {
    type: String,
    required: true
};
const reqNum = {
    type: Number,
    required: true
};

const issue = new Schema({
    id: reqNum,
    title:  reqString, // String is shorthand for {type: String}
    description:   reqString,
    author: reqString,
    priority:   reqString,
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

exports.Issue = mongoose.model('Issue', issue, 'issues');