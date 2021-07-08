import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'fr-image-displayer',
  templateUrl: './facial-recognition-image-displayer.component.html',
  styleUrls: ['./facial-recognition-image-displayer.component.scss']
})
export class FacialRecognitionImageDisplayerComponent implements OnInit {

  @Input() url: string = '';

  public protectedUrl: any;
  
  constructor(private readonly authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    fetch('https://kong.tls.ai' + this.url , { headers : { 'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzExZjBmLWVjMzYtNGI1YS1iMDE3LTQ0YzAwNGNlNGRlNyIsInJvbGVJZCI6ImJkYzY4OTNmLTE0YjEtNGMwOS1hY2VkLTVhMzMxOTdkYTdmNSIsImlzRGF0YVJlc3RyaWN0ZWQiOmZhbHNlLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwiaXNBY3RpdmUiOnRydWUsImxvY2FsZSI6ImVuX3VzIiwidGltZXpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwidXNlckdyb3VwSWQiOiIwMDAwMDAwMC0wMjAwLTc5MTItNTVhNy00NThkNDBkYTg3NjUiLCJqdGkiOiIzYzYxOGY5Ny1jNmUxLTQ2NWMtOGI2Mi01YTAyOGI3ZjFmOTAiLCJpYXQiOjE2MjU3NTE5MDgsImV4cCI6MTYyNTc4NzkwOH0.bb1Q6GkLlJQlPoYqgqkNJSXAyhbxOamQwTkPbtbGEaSRjraZjL12DhqrNyZzRzb09pf_KvhYX1j0T3ccRtJGpua3tjuWqqCGToUrGrthJtKHegq46cW9i6M0gMXxzR2CWcF8XZDMbAyXNJpQzFw0s9_TR2w1hymGe_swJaPluanbWckb9950d2pA9vO_EX0sFp5qwdx3PIHLkI5WFbRR-i8noWmVYEdJLkcRirtFqwj0pac88mzUe0bQbimhLEMITHj2eDsPQ_uDXrPG8EMyXhZQPweHvKToH8HytMUMvjR776SSSozG8lXqYYisWhDhiEvzfY8u3bvN5qTT_lo3naV62ouqVpG0COB9N6zaJD7tANkLgDl05g9BVPX5eUs5k-2FN8tSHuzZK3Wja59GyA80ZLNI94yliS4MNtMsErDJg2zt6_TbV-V3_AGU8srOKujeGSAcyx88Q_tmfcS1bIFcyxmvFBsOU7OjXa-OhIhFj24-cwhKD6XWJdDe489Z3NIuGyqt_YiLPdCY-heWzPp6AN9hlefIWDN14MREG2pVhJuMKoY4v8CCC_dl9101qeXz_fLhzm_7asi9sk3xEr4FN4d0YZqUq0LgQ0agLZXzAjEMQGBjqvAaD7juEvUSwIK4huCMaU8nd_Svj-_QQddMGCkaEtqf7RZ_6CYnrW8'} })
        .then(res => res.blob())
        .then(blob => {
          this.protectedUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        });
      }
}
