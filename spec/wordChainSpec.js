'use strict';

var fs = require('fs');

var wordChain = require(__dirname + "/../js/wordChain").wordChain;

describe ('WordChain', function() {
	
	beforeEach(function() {
		//var config = {};
		this.classUnderTest = wordChain;
		this.dictionary = ['cat', 'cot', 'dot', 'dog'];
	});
	
	it ('confirms that cat and dog have a difference-count of three', function() {
		var differences = this.classUnderTest.countDifferences('cat', 'dog')
		expect(differences).toBe(3);
	});

	it ('confirms that cog and dog have a difference-count of one', function() {
		var differences = this.classUnderTest.countDifferences('cog', 'dog')
		expect(differences).toBe(1);
	});

	it ('returns the initial list of candidates as cat, cot and dot', function() {
		var wordlist = this.classUnderTest.removeWordsWithMoreThanOneDifferenceFromTheStartWord('cat', this.dictionary);
		expect(wordlist).not.toContain('cat');
		expect(wordlist).toContain('cot');
		expect(wordlist).not.toContain('dot');
		expect(wordlist).not.toContain('dog');
	});
	
	it ('filters out any words that were have already been used in our path from the start word to the target word', function() {
		var wordlist = ['dot', 'cot', 'pot'];
		var predecessors = ['dot', 'cot'];		
		wordlist = this.classUnderTest.removeWordsThatHaveAlreadyBeenSeen(wordlist, predecessors);
		expect(wordlist).toContain('pot');
		expect(wordlist).not.toContain('cot');
		expect(wordlist).not.toContain('dot');
	});
	

	it ('removes any duplicated words in the list', function() {
		var wordlist = ['dot', 'dot', 'pot'];
		var deduplicatedList = this.classUnderTest.deduplicate(wordlist);
		expect(deduplicatedList).toContain('dot');
		expect(deduplicatedList).toContain('pot');
		expect(deduplicatedList.length).toBe(2);
	});
		
		
	it ('sorts the wordlist according to the number of differences between each word and the target word', function() {
		var wordlist = ['cat', 'cog', 'cot'];
		var targetWord = 'dog';
		
		var sortedList = this.classUnderTest.sortByNumberOfDifferences(wordlist, targetWord);
		expect(sortedList[0]).toBe('cog');
		expect(sortedList[1]).toBe('cot');
		expect(sortedList[2]).toBe('cat');
	});
		
	it('should throw an error if the start word is not in the dictionary', function() {
		var dictionary = ['cat', 'cog', 'cot'];
		var self = this;
		expect( function(){ self.classUnderTest.findWordChain('rubbish', 'cat', dictionary);} ).toThrow(new Error('rubbish is not listed in the dictionary!'));
	});
	
	it('should throw an error if the target word is not in the dictionary', function() {
		var dictionary = ['cat', 'cog', 'cot'];
		var self = this;
		expect( function(){ self.classUnderTest.findWordChain('cat', 'rubbish', dictionary);} ).toThrow(new Error('rubbish is not listed in the dictionary!'));
	});

	it('returns the path from cat to dog', function() {
		var dictionary = this.classUnderTest.loadDictionary();
		this.classUnderTest.findWordChain('cat', 'dog', dictionary);
	});

	it('returns the path from frog to leap', function() {
		var dictionary = this.classUnderTest.loadDictionary();
		this.classUnderTest.findWordChain('frog', 'leap', dictionary);
	});

	it('returns the path from code to kata', function() {
		var dictionary = this.classUnderTest.loadDictionary();
		this.classUnderTest.findWordChain('code', 'kata', dictionary);
	});

});



