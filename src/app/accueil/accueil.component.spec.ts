import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilComponent } from './accueil.component';
import { LinksService } from '../Services/Liens/links-service';
import { of } from 'rxjs';

describe('AccueilComponent', () => {
    let component: AccueilComponent;
    let fixture: ComponentFixture<AccueilComponent>;
    let linksServiceStub: Partial<LinksService>;

    beforeEach(async () => {
        linksServiceStub = {
            links$: of([{ id: 'f9e27311-a351-4b91-b1e4-560b97383a8a',
                          adresse: 'http://www.amazon.fr',
                          texte: 'amazon.fr',
                          Status: 1,
                          iduser: 1 
                        },
                        { id: '1e22213a-c4e1-4770-9097-9793eb9d7098',
                          adresse: 'https://www.banquepopulaire.fr/',
                          texte: 'Banque populaire',
                          Status: 1,
                          iduser: 1  
                        }]),
            getLinks: jasmine.createSpy('getLinks').and.returnValue(of())
        };

        await TestBed.configureTestingModule({
            providers: [{ provide: LinksService, useValue: linksServiceStub }]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AccueilComponent);
        component = fixture.componentInstance;
    });

    it('should fetch links on initialization', () => {
        component.ngOnInit();
        expect(linksServiceStub.getLinks).toHaveBeenCalled();
    });

    it('should have links populated from observable', () => {
        component.links$.subscribe(l => {
            expect(l.length).toBe(2);
            expect(l[0].texte).toBe('amazon.fr');
            expect(l[1].texte).toBe('banque populaire');
        });
    });
});
