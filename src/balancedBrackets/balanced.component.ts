import { Component } from '@angular/core';

@Component({
  selector: 'balanced-brackets',
  templateUrl: './balanced.component.html',
  styleUrls: ['./balanced.component.scss']
})
export class BalancedBracketsComponent {
    title: String = 'Balanced Brackets'
    balancedText: String = null
    isBalanceded: Boolean = null
    isClicked: Boolean
    tokens: string[][]

    constructor() {
        this.isBalanceded = null;
        this.isClicked = null;
        this.tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];
    }

    isBalanced() { 
        if(this.balancedText !== null) {
            this.isClicked = true;
            if (this.balancedText === null) { 
                this.isBalanceded = true;
            }
            let expression = this.balancedText.split('');
            var stack = [];
            for (let i = 0; i < expression.length; i++) {
                if (this.isParanthesis(expression[i])) {
                    if (this.isOpenParenthesis(expression[i])) {
                        stack.push(expression[i]);
                    } else {
                        if (stack.length === 0) {
                            return this.isBalanceded = false;
                        }
                        let top = stack.pop(); // pop off the top element from stack
                        if (!this.matches(top, expression[i])) {
                            return this.isBalanceded = false;
                        }
                    }
                }
            }
        }

        this.isBalanceded = stack.length === 0 ? true : false;

    }

    isParanthesis(char) {
        var str = '{}[]()';
        if (str.indexOf(char) > -1) {
            return true;
        } else {
            return false;
        }
    }

    isOpenParenthesis(parenthesisChar) {
        for (var j = 0; j < this.tokens.length; j++) {
            if (this.tokens[j][0] === parenthesisChar) {
            return true;
            }
        }
        return false;
    }

    matches(topOfStack, closedParenthesis) {
        for (var k = 0; k < this.tokens.length; k++) {
        if (this.tokens[k][0] === topOfStack && 
            this.tokens[k][1] === closedParenthesis) {
            return true;
        }
        }
        return false;
    }
}