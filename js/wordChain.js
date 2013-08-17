
var fs = require ('fs');

var WordChain = function () {

	'use strict';
	
	/*
	 * This is the method which will kick off the search for a word chain 
	 * between any two words.
	 */
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
	
	
	this.loadDictionary = function() {
		return fs.readFileSync('./words')
					.toString()
					.toLowerCase()
					.split("\n");
	};
	
	/*
	 * Count the difference between any two words.
	 * E.g. cat and fat have one difference (the letter 'f')
	 */
	this.countDifferences = function(word1, word2) {
		var count = 0;
		for (var i = 0; i < word1.length; i++) {
			if (word1[i] !== word2[i]) {
				count++;
			}
		}
		return count;	
	};
	
	/*
	 * Remove all words from the dictionary which contain words with more than one difference 
	 * from the start word.
	 * E.g. if start word is cat then cog would be removed while fat would remain.
	 */
	this.removeWordsWithMoreThanOneDifferenceFromTheStartWord = function(startWord, dictionary) {
		var self = this;
		var wordlist = dictionary.filter(function (word) {
			return self.countDifferences(startWord, word) === 1 &&
					startWord.length === word.length;
		});
		return wordlist;
	};

	/*
	 * Remove all words from the wordlist which are also present in our current wordchain.
	 */
	this.removeWordsThatHaveAlreadyBeenSeen = function(wordlist, predecessors) {
		return wordlist.filter(function(word) {
			return predecessors.indexOf(word) === -1;
		});
	};
	
	/*
	 * Remove any duplicates in the wordlist
	 */
	this.deduplicate = function(wordlist) {		
		return wordlist.filter( function(word, idx, list) {
			return wordlist.indexOf(word) === idx;		
		});		
	};
	
	
	/*
	 * Sort the wordlist in increasing number of differences from the target word.
	 * This ensures that the returned wordlist will first list all words which are closer
	 * to the targetWord rather than words which are further removed from the target word.
	 * 
	 * E.g. If the targetword is cat then the returned list would be [fat, big, dog]
	 * rather than [big, fat, dog].  This is because the word 'fat' is closer to 'cat' than 
	 * the word 'big'.
	 */
	this.sortByNumberOfDifferences = function(wordlist, targetWord) {
		var self = this;
		return wordlist.sort(function(word1, word2) {
			return self.countDifferences(word1, targetWord) - self.countDifferences(word2, targetWord);
		});
	};


	/*
	 * This is where the logic is all pulled together.
	 * The for-loop will attempt to form a word chain to the target word using each word
	 * in the wordlist.  The loop will exit if a chain is successfully formed.
	 */
	this.search = function(startWord, targetWord, predecessors, dictionary) {
		var wordlist = this.removeWordsWithMoreThanOneDifferenceFromTheStartWord(startWord, dictionary);
		
		wordlist = this.removeWordsThatHaveAlreadyBeenSeen(wordlist, predecessors);
		
		wordlist = this.deduplicate(wordlist);

		wordlist = this.sortByNumberOfDifferences(wordlist, targetWord);
		
		for (var i = 0; i < wordlist.length; i++) {
			if (wordlist[i] === targetWord) {
				console.log ('Success ... ' + predecessors + ',' + startWord + ' and ' + targetWord + '\n\n');
				return true;
			} else {
				predecessors.push(startWord);
				var success = this.search(wordlist[i], targetWord, predecessors, dictionary);
				if (success) {
					return true;
				} else {
					console.log ('Failed to find a path from ' + startWord + ' to ' + targetWord + ' with the following path: ' + predecessors);
					console.log ('About to backtrack and try again with a different path!');
					predecessors.pop();
				}
			}
		}
		
		return false;
	};
	
};

this.wordChain = new WordChain();
