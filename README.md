Najpierw trzeba zdefiniować zmienną DOCKERHUB_USERNAME oraz sekret DOCKERHUB_TOKEN

Opracowany łańcuch (pipeline) w usłudzie GitHub Actions zawiera kolejno:
  1. Uruchomienie: Ręczne (workflow_dispatch) lub automatyczne (push na tagi v*).
  2. Pobranie kodu źródłowego.
  3. Definicja tagów obrazu: SHA:
       - Tworzony na podstawie skrótu SHA (krótszy format)
       - Semver: Oparty na wersjonowaniu semantycznym (np. v1.0.0).
  4. Konfiguracja QEMU.
  5. Konfiguracja Buildx.
  6. Logowanie do DockerHub.
  7. Ustawienie tagu dla skanowania: Wybranie odpowiedniego tagu dla Trivy(przyjmuje tylko jeden).
  8. Budowa obrazu dla linux/amd64: Z użyciem cache, ale bez wypychania.
  9. Skanowanie obrazu linux/amd64: Wykrywanie podatności (CRITICAL, HIGH) przy użyciu aquasecurity/trivy-action@0.19.0.
  10. Budowa obrazu dla linux/arm64: Analogiczne jak dla linux/amd64.
  11. Skanowanie obrazu linux/arm64: Podobnie jak dla amd64.
  12. Budowa i wypchnięcie obrazu wieloarchitektonicznego gdy skanowanie zakończone sukcesem.


Potwierdzenie poprawnego działania na DockerHub:
![image](https://github.com/user-attachments/assets/8d7d8c7b-640a-4baa-826e-fc6958a3b18e)


