const express = require('express');

module.exports = {
  post: (req, res) => {
    res.send("POST /wish")
  },

  delete: (req, res) => {
    res.send("DELETE /wish")
  }
}