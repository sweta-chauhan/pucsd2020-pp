import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { CareerObjectiveComponent } from './career-objective/career-objective.component';
import { AcademicQualificationComponent } from './academic-qualification/academic-qualification.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectAndAssignmentComponent } from './project-and-assignment/project-and-assignment.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    CareerObjectiveComponent,
    AcademicQualificationComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectAndAssignmentComponent,
    HobbiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	RouterModule.forRoot([  
	      { path: 'contact', component:  ContactComponent},  
		  { path: 'career-objective', component: CareerObjectiveComponent},  
		  { path: 'academic-qualification', component: AcademicQualificationComponent},  
		  { path: 'experience', component: ExperienceComponent },
		  { path: 'project-and-assignment', component: ProjectAndAssignmentComponent},   
		  { path: 'skills', component: SkillsComponent}, 
		  {path: 'hobbies' , component: HobbiesComponent}  
					       ]),  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
