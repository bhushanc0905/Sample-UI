import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css']
})
export class MyformComponent implements OnInit {
  formTest: FormGroup;
  uniqueWords: string[] = [];
  fileContent: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.formTest = this.formBuilder.group({
      fileInputBox: ['', Validators.required],
      selectedMessageNum: ['', Validators.required],
      totmsgsTxtBox: [0, Validators.required],
      totWordsTxtBox: [0, Validators.required],
      numUnqWrdsTxtBox: [0, Validators.required],
      ressembledMsgOutput: [''],
      listofUniqMsgBox: ['']
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContent = reader.result as string;
        this.parseText();
      };
      reader.readAsText(file);
    }
  }

  parseText(): void {
    // Parse the text content and update the form values
    const sentences = this.fileContent.split('\n').map(sentence => sentence.trim());
    const allWords = sentences.join(' ').toLowerCase().split(' ');
    this.uniqueWords = Array.from(new Set(allWords));
    
    // Update form values
    this.formTest.patchValue({
      totmsgsTxtBox: sentences.length,
      totWordsTxtBox: allWords.length,
      numUnqWrdsTxtBox: this.uniqueWords.length
    });
  }

  submitForm(): void {
    // Handle form submission logic here
    console.log('Form submitted');
  }

  getMaxMessageNum(): number {
    return this.formTest.get('totmsgsTxtBox')?.value || 1;
  }

  getTotalMessages(): number {
    return this.formTest.get('totmsgsTxtBox')?.value || 0;
  }

  getTotalWords(): number {
    return this.formTest.get('totWordsTxtBox')?.value || 0;
  }

  getTotalUniqueWords(): number {
    return this.formTest.get('numUnqWrdsTxtBox')?.value || 0;
  }

  getRessembledMsgOutput(): string {
    return this.formTest.get('ressembledMsgOutput')?.value || '';
  }
}
