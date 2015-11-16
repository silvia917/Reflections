/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Memory = Promise.promisifyAll(mongoose.model('Memory')); 

var seedUsers = function () {

    var users = [
        {   
            name: 'Fullstack',
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            name: 'Barack Obama',
            email: 'obama@gmail.com',
            password: 'potus',
            photo: 'https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg'
            
        },
        {
            name: 'Grumpy Cat',
            email: 'grumpy@grumpy.com',
            password: 'hello',
            photo: 'https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg'
        }
    ];

    return User.createAsync(users);

};

var seedMemories = function() {
    var memories = [
    {
        date: new Date('Jan 3, 2005'),
        memory: "I was sworn in as a senator on January 3, 2005 becoming the only Senate member of the Congressional Black Caucus. So exciting! CQ Weekly characterized me as a 'loyal Democrat' based on analysis of all Senate votes from 2005 to 2007. Still hoping to run for president.",
        user: 'obama@gmail.com'
    },
    {
        date: new Date('Aug 4, 1961'),
        memory: "I was born on August 4, 1961, at Kapiʻolani Maternity & Gynecological Hospital.",
        user: 'obama@gmail.com'
    },
    {
        date: new Date('Feb 10, 2007'),
        memory: 'Today I announced I am running for President in front of the Old State Capitol building in Springfield, Illinois. I chose this place because it is where Abraham Lincoln delivered his historic "House Divided" speech in 1858. Nervous but excited for the future.',
        user: 'obama@gmail.com' 
    },
    {
        date: new Date('Sep 10, 1989'),
        memory: 'I have been working as a summer associate at the Chicago law firm of Sidley Austin since June. Michelle Robinson is my advisor here. I have asked her out on a date several times but she keeps rejecting me. Maybe I should give up.',
        user: 'obama@gmail.com'
    },
    {
        date: new Date('May 2, 2011'),
        memory: 'A few weeks ago, I authorized a raid to be conducted by the Navy Seals and now we got Osama Bin Laden! This is incredible and I had the honor of announcing it to the world. I love my job.',
        user: 'obama@gmail.com'
    },
    {
        date: new Date('Oct 9, 2009'),
        memory: 'Today, the Norwegian Nobel Committee announced that I had won the 2009 Nobel Peace Prize for my extraordinary efforts to strengthen international diplomacy and cooperation between peoples!! I will accept this award in Oslo, Norway in December. This is such an honor',
        user: 'obama@gmail.com'
    },
    {
        date: new Date('Sept 17, 2012'),
        memory: "Got some cat toys. They sucked.",
        user: "grumpy@grumpy.com"
    },
    {
        date: new Date('Apr 4, 2012'),
        memory: "I was born!",
        user: 'grumpy@grumpy.com'
    },
    {
        date: new Date('2015-07-06'),
        memory: "Went to Greece! I hated it.",
        user: 'grumpy@grumpy.com'
    }
    ];
    return User.find({}).then(function(users) {
        return memories.map(function(element) {
            for(var i = 0; i < users.length; i++) {
                if (element.user == users[i].email) {
                    element.user = users[i]._id
                }
            }
            return element;
        })
    })
    .then(function(updated) {
        return Memory.createAsync(updated);     
    })
}

connectToDb.then(function (db) {

    User.findAsync({}).then(function (users) {
        User.remove()
        .then(function(){
            return seedUsers();
        })
        .then(function(){
            return Memory.remove()
            .then(function(){
                return seedMemories();
            })
        })
        .then(function() {
            var allMemories;
            return Memory.find({})
            .then(function(memories) {
                allMemories = memories;
                return User.find({})
                .then(function(users) {
                    return users.map(function(user) {
                        for (var i = 0; i < allMemories.length; i++) {
                            if(allMemories[i].user.toString() == user._id.toString()) {
                                user.memories.addToSet(allMemories[i]._id)
                            }
                        }
                        return user;
                    })
                })
                .then(function(users) {
                    return Promise.all(users.map(function(i) {
                        return i.save();
                    })
                    );
                })
            })
        })
        .then(function(){
            console.log(chalk.green("All data has been seeded."));
            process.kill(0);
        })
    })
});