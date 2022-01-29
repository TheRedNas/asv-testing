import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqItems: Array<any> = [
    {
      question: "I cannot log in / register an account",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "I forgot my password",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "I no longer have access to my account",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "I do not know how to make a post",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "I do not know how to show interest in a post",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "I want to customize my account",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "I forgot my password",
      answer: "Nobody expects the spanish inquisition!"
    },
    {
      question: "I want to create ten questions for the faq to make it look pretty",
      answer: "Have you tried turning it off en back on again?"
    },
    {
      question: "Is mayonaise an instrument?",
      answer: "No Patrick, mayonaise is not an instrument."
    },{
      question: "Is dad coming home after he went to the supermarket to get cigarettes?",
      answer: "uhh...."
    }
  ]
  
  ngOnInit(): void {
  }

}
