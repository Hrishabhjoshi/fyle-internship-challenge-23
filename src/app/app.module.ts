import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { SearchComponent } from './components/search.component';
import { SearchService } from './services/search.service';
import { PaginationComponent } from './components/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
