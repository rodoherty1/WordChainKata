
var fs = require ('fs');

var WordChain = function () {

	'use strict';
	
	this.loadDictionary = function() {
		return fs.readFileSync('./words')
					.toString()
					.toLowerCase()
					.split("\n");
	};
	
	this.countDifferences = function(word1, word2) {
		var count = 0;
		for (var i = 0; i < word1.length; i++) {
			if (word1[i] !== word2[i]) {
				count++;
			}
		}
		return count;	
	};
	
	this.removeWordsWithMoreThanOneDifferenceFromTheStartWord = function(start, dictionary) {
		var self = this;
		var candidates = dictionary.filter(function (word) {
			return self.countDifferences(start, word) === 1 &&
					start.length === word.length;
		});
		return candidates;
	};
	
	this.removeWordsThatHaveAlreadyBeenSeen = function(candidates, predecessors) {
		return candidates.filter(function(word) {
			return predecessors.indexOf(word) === -1;
		});
	};
	
	this.deduplicate = function(wordlist) {		
		return wordlist.filter( function(word, idx, list) {
			return wordlist.indexOf(word) === idx;		
		});		
	};
	
	
	this.sortByNumberOfDifferences = function(wordlist, end) {
		var self = this;
		return wordlist.sort(function(word1, word2) {
			return self.countDifferences(word1, end) - self.countDifferences(word2, end);
		});
	};
		
	this.findWordChain = function(startWord, targetWord, dictionary) {
		if (dictionary.indexOf(startWord) < 0) {
			throw startWord + ' is not listed in the dictionary!';
		}
		
		if(dictionary.indexOf(targetWord) < 0) {
			throw targetWord + ' is not listed in the dictionary!';
		}
		
		console.log ('Finding path from ' + startWord + ' to ' + targetWord);
		this.search (startWord, targetWord, [], dictionary);
	};

	
	this.search = function(start, end, predecessors, dictionary) {
		var wordlist = this.removeWordsWithMoreThanOneDifferenceFromTheStartWord(start, dictionary);
		
		wordlist = this.removeWordsThatHaveAlreadyBeenSeen(wordlist, predecessors);
		
		wordlist = this.deduplicate(wordlist);

		wordlist = this.sortByNumberOfDifferences(wordlist, end);
		
		for (var i = 0; i < wordlist.length; i++) {
			if (wordlist[i] === end) {
				console.log ('Success ... ' + predecessors + ',' + start + ' and ' + end + '\n\n');
				return true;
			} else {
				predecessors.push(start);
				var success = this.search(wordlist[i], end, predecessors, dictionary);
				if (success) {
					return true;
				} else {
					console.log ('Failed to find a path from ' + start + ' to ' + end + ' with the following path: ' + predecessors);
					console.log ('About to backtrack and try again with a different path!');
					predecessors.pop();
				}
			}
		}
		
		return false;
	};
	
};

this.wordChain = new WordChain();
