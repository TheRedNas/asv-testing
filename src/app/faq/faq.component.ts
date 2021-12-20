import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqItems: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.showFaqItems();
  }

  showFaqItems() {
    this.faqItems.push({
      question: "I cannot log in / register an account",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "I forgot my password",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "I no longer have access to my account",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "I do not know how to make a post",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "I do not know how to show interest in a post",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "I want to customize my account",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "I forgot my password",
      answer: "Nobody expects the spanish inquisition!"
    })
    this.faqItems.push({
      question: "I want to create ten questions for the faq to make it look pretty",
      answer: "Have you tried turning it off en back on again?"
    })
    this.faqItems.push({
      question: "Is mayonaise an instrument?",
      answer: "No Patrick, mayonaise is not an instrument."
    })
    this.faqItems.push({
      question: "Is dad coming home after he went to the supermarket to get cigarettes?",
      answer: "uhh...."
    })
  }

}
